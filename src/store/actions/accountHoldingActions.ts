import * as AccountHoldingTypes from "../types/accountHoldingTypes";

export function updateAccountHoldingBalance(accountId: string, assetId: string, balance: number): AccountHoldingTypes.IUpdateAccountHoldingBalance {
  return {
    type: AccountHoldingTypes.UPDATE_ACCOUNT_HOLDING_BALANCE,
    accountId,
    assetId,
    balance
  };
}

export function updateAccountHoldingNotes(accountId: string, assetId: string, notes: string): AccountHoldingTypes.IUpdateAccountHoldingNotes {
  return {
    type: AccountHoldingTypes.UPDATE_ACCOUNT_HOLDING_NOTES,
    accountId,
    assetId,
    notes
  };
}
