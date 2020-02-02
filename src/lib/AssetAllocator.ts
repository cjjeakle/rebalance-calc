import { AppState } from "../store";
import { AccountHoldingsStateT } from "../store/types/accountHoldingTypes";
import { AccountTaxTreatmentT } from "../store/types/accountTypes";
import { AssetTaxTreatmentT } from "../store/types/assetTypes";

type AvailableAccountBalanceT = {
  accountId: string,
  taxTreatment: AccountTaxTreatmentT,
  availableBalance: number
}
type AvailableAccountBalanceByTaxTreatmentT = {
  [taxTreatment in AccountTaxTreatmentT]: AvailableAccountBalanceT[]
}

type TargetAssetBalanceT = {
  assetId: string,
  taxTreatment: AssetTaxTreatmentT,
  neededAllocation: number
}
type TargetAssetBalanceByTaxTreatmentT = {
  [taxTreatment in AssetTaxTreatmentT]: TargetAssetBalanceT[]
}

/*
The asset allocation calculator
-------------------------------
*/

export default function computeSuggestedHoldings(undoableState: AppState): AccountHoldingsStateT {
  // Data validations
  if (undoableState.present.assets.find(asset => asset.taxTreatment === undefined)) {
    return {};
  }
  if (undoableState.present.accounts.find(account => account.taxTreatment === undefined)) {
    return {};
  }

  let currentAccountHoldings = undoableState.present.holdings;
  let accountBalances =
    undoableState
    .present
    .accounts
    .map(account => <AvailableAccountBalanceT>{
      accountId: account.id,
      taxTreatment: account.taxTreatment,
      availableBalance:
        Object.keys(currentAccountHoldings[account.id] ?? {})
        .reduce((accountBalance: number, assetId: string): number => {
          accountBalance += currentAccountHoldings[account.id][assetId].balance;
          return accountBalance;
        }, 0)
    });

  let totalBalance =
    accountBalances
    .reduce((balanceSum: number, accountBalance: AvailableAccountBalanceT): number => {
      balanceSum += accountBalance.availableBalance;
      return balanceSum;
    }, 0);

  let assetTargets =
    undoableState
    .present
    .assets
    .map(asset => <TargetAssetBalanceT>{
      assetId: asset.id,
      taxTreatment: asset.taxTreatment,
      neededAllocation: ((asset.allocation / 100) * totalBalance)
    });

  let availableAccountBalanceByTaxTreatment: AvailableAccountBalanceByTaxTreatmentT =
    accountBalances
    .reduce((accumulator: AvailableAccountBalanceByTaxTreatmentT, availableBalance: AvailableAccountBalanceT) => {
      accumulator[availableBalance.taxTreatment].push(availableBalance);
      return accumulator;
    }, { "regular" : [], "deferred": [], "exempt": [] });
  let targetAssetBalanceByTaxTreatment: TargetAssetBalanceByTaxTreatmentT =
    assetTargets
    .reduce((accumulator: TargetAssetBalanceByTaxTreatmentT, assetTarget: TargetAssetBalanceT) => {
      accumulator[assetTarget.taxTreatment].push(assetTarget);
      return accumulator;
    }, { "regular" : [], "inefficient": [], "advantaged": [] });

  let suggestedAccountHoldings: AccountHoldingsStateT = {};

  // Assign least tax efficient assets to:
  // Tax deferred -> tax free -> taxable
  allocateAssets(
    availableAccountBalanceByTaxTreatment["deferred"],
    targetAssetBalanceByTaxTreatment["inefficient"],
    suggestedAccountHoldings);
  allocateAssets(
    availableAccountBalanceByTaxTreatment["exempt"],
    targetAssetBalanceByTaxTreatment["inefficient"],
    suggestedAccountHoldings);
  allocateAssets(
    availableAccountBalanceByTaxTreatment["regular"],
    targetAssetBalanceByTaxTreatment["inefficient"],
    suggestedAccountHoldings);

  // Assign the most tax efficient assets (eligible for foreign tax credit) to:
  // Taxable -> wait for remainder pass
  allocateAssets(
    availableAccountBalanceByTaxTreatment["regular"],
    targetAssetBalanceByTaxTreatment["advantaged"],
    suggestedAccountHoldings);

  // Assign regular assets, starting with those with the highest expected growth, to:
  // tax free -> wait for remainder pass
  allocateAssets(
    availableAccountBalanceByTaxTreatment["exempt"],
    targetAssetBalanceByTaxTreatment["regular"],
    suggestedAccountHoldings);

  // Assign any remaining assets to any account, in the list order for each
  allocateAssets(
    accountBalances,
    assetTargets,
    suggestedAccountHoldings);

  return suggestedAccountHoldings;
}

function allocateAssets(
  accounts: AvailableAccountBalanceT[],
  assets: TargetAssetBalanceT[],
  assetAllocationBuffer: AccountHoldingsStateT
): void {
  let assetIndex = 0;
  let accountIndex = 0;

  while (assetIndex < assets.length && accountIndex < accounts.length) {
    let currentAsset = assets[assetIndex];
    let currentAccount = accounts[accountIndex];

    if (currentAsset.neededAllocation <= 0) {
      assetIndex++;
      continue;
    }
    if (currentAccount.availableBalance <= 0) {
      accountIndex++;
      continue;
    }

    // If this account has a lower balance than the needed allocation, dedicate the entire remaining balance to it
    // Otherwise, fulfill the asset's whole balance requirement using the current account and move to the next asset
    let fundsApplied = 0;
    if (currentAccount.availableBalance < currentAsset.neededAllocation) {
      fundsApplied = currentAccount.availableBalance;
      currentAccount.availableBalance = 0;
      currentAsset.neededAllocation -= fundsApplied;
    } else {
      fundsApplied = currentAsset.neededAllocation;
      currentAsset.neededAllocation = 0;
      currentAccount.availableBalance -= fundsApplied;
    }

    if (!assetAllocationBuffer[currentAccount.accountId]) {
      assetAllocationBuffer[currentAccount.accountId] = {};
    }
    if (!assetAllocationBuffer[currentAccount.accountId][currentAsset.assetId]) {
      assetAllocationBuffer[currentAccount.accountId][currentAsset.assetId] = {
        balance: 0,
        lockAllocation: false,
        notes: ""
      }
    }
    assetAllocationBuffer[currentAccount.accountId][currentAsset.assetId].balance += fundsApplied;
  }
}
