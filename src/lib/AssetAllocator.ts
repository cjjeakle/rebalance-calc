import { CoreAppStateT } from "../store";
import { AccountHoldingsStateT } from "../store/types/accountHoldingTypes";
import { AccountTaxTreatmentT } from "../store/types/accountTypes";
import { AssetTaxTreatmentT } from "../store/types/assetTypes";

type AvailableAccountBalanceT = {
  accountId: string,
  name: string,
  taxTreatment: AccountTaxTreatmentT,
  availableBalance: number
}
type AvailableAccountBalanceByTaxTreatmentT = {
  [taxTreatment in AccountTaxTreatmentT]: AvailableAccountBalanceT[]
}

type TargetAssetBalanceT = {
  assetId: string,
  name: string,
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

export default function computeSuggestedHoldings(appState: CoreAppStateT): AccountHoldingsStateT {
  // Data validations
  let totalAssetAllocation = appState.assets.reduce((totalAllocation, asset) => {
    if (asset.taxTreatment === undefined) {
      throw "Please specify a tax treatment for the asset named: '" + asset.name + "'";
    }
    return totalAllocation + asset.allocation;
  }, 0);

  if (totalAssetAllocation > 100) {
    throw "The total specified asset allocation (" + totalAssetAllocation + ") adds up to more than 100%!";
  } else if (totalAssetAllocation < 100) {
    throw "The total specified asset allocation (" + totalAssetAllocation + ") adds up to less than 100%";
  } else if (!totalAssetAllocation) {
    throw "It appears there are missing asset allocation percentages, or invalid data was entered.";
  }

  appState.accounts.forEach(account => {
    if (account.taxTreatment === undefined) {
      throw "Please specify a tax treatment for the account named: '" + account.name + "'";
    }
  });

  let currentAccountHoldings = appState.holdings;
  let accountBalances =
    appState
    .accounts
    .map(account => <AvailableAccountBalanceT>{
      accountId: account.id,
      name: account.name,
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
      if (accountBalance.availableBalance < 0) {
        throw "The account named '" + accountBalance.name + "' has a negative overall balance. It appears there are withdrawals that total more than the account's available value.";
      }
      balanceSum += accountBalance.availableBalance;
      return balanceSum;
    }, 0);

  let assetTargets =
    appState
    .assets
    .map(asset => <TargetAssetBalanceT>{
      assetId: asset.id,
      name: asset.name,
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
  appState.accounts.map(account => {
    if (!suggestedAccountHoldings[account.id]) {
      suggestedAccountHoldings[account.id] = {};
    }
    appState.assets.map(asset => {
      suggestedAccountHoldings[account.id][asset.id] = {
        balance: 0,
        lockAllocation: false,
        notes: ""
      };
      if (
        currentAccountHoldings[account.id]
        && currentAccountHoldings[account.id][asset.id]
        && currentAccountHoldings[account.id][asset.id].lockAllocation
      ) {
        let lockedBalance = currentAccountHoldings[account.id][asset.id].balance;
        suggestedAccountHoldings[account.id][asset.id].balance = lockedBalance;
        let lockedAccountIndex =
          availableAccountBalanceByTaxTreatment[account.taxTreatment]
          .findIndex(availableBalance => availableBalance.accountId == account.id);
        availableAccountBalanceByTaxTreatment[account.taxTreatment][lockedAccountIndex].availableBalance -= lockedBalance;
        let lockedAssetIndex =
          targetAssetBalanceByTaxTreatment[asset.taxTreatment]
          .findIndex(targetAssetBalance => targetAssetBalance.assetId == asset.id);
        if (targetAssetBalanceByTaxTreatment[asset.taxTreatment][lockedAssetIndex].neededAllocation < lockedBalance) {
          throw "More funds are locked to the asset class '" + asset.name + "' than can be permitted by the specified asset allocation.";
        }
        targetAssetBalanceByTaxTreatment[asset.taxTreatment][lockedAssetIndex].neededAllocation -= lockedBalance;
      }
    });
  });

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

    assetAllocationBuffer[currentAccount.accountId][currentAsset.assetId].balance += fundsApplied;
  }
}
