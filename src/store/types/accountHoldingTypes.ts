import { Action } from "redux";

export interface IAccountHoldings {
  [assetId: string] : {
    balance: number;
    lockAllocation: boolean;
    notes: string;
  }
}

export type AccountHoldingsStateT = { [accountId: string] : IAccountHoldings} ;

/* Actions: */
export const UPDATE_ACCOUNT_HOLDING_BALANCE = "UPDATE_ACCOUNT_HOLDING_BALANCE";
export const TOGGLE_ACCOUNT_HOLDING_LOCK = "TOGGLE_ACCOUNT_HOLDING_LOCK";
export const UPDATE_ACCOUNT_HOLDING_NOTES = "UPDATE_ACCOUNT_HOLDING_NOTES";

/* Action Interfaces: */
export interface IUpdateAccountHoldingBalance extends Action {
  type: typeof UPDATE_ACCOUNT_HOLDING_BALANCE;
  accountId: string;
  assetId: string;
  balance: number;
}

export interface IToggleAccountHoldingLock extends Action {
  type: typeof TOGGLE_ACCOUNT_HOLDING_LOCK;
  accountId: string;
  assetId: string;
}

export interface IUpdateAccountHoldingNotes extends Action {
  type: typeof UPDATE_ACCOUNT_HOLDING_NOTES;
  accountId: string;
  assetId: string;
  notes: string;
}

/* Supported Actions: */
export type ActionTypes =
  | IUpdateAccountHoldingBalance
  | IToggleAccountHoldingLock
  | IUpdateAccountHoldingNotes;
