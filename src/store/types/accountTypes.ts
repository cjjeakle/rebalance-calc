import { Action } from "redux";

export type AccountListNames = "accountRegular" | "accountTaxDeferred" | "accountTaxExempt"

export interface IAccount {
  name: string;
  balance: number;
  notes: string;
  showDetails: boolean;
}

export interface IAccountsState {
  [id: string]: IAccount;
}

export type AccountStateT = IAccount[];

/* Actions: */
export const ADD_ACCOUNT = "ADD_ACCOUNT";
export const UPDATE_ACCOUNT_NAME = "UPDATE_ACCOUNT_NAME";
export const UPDATE_ACCOUNT_BALANCE = "UPDATE_ACCOUNT_BALANCE";
export const UPDATE_ACCOUNT_NOTES = "UPDATE_ACCOUNT_NOTES";
export const TOGGLE_ACCOUNT_DETAILS = "TOGGLE_ACCOUNT_DETAILS";

/* Action Interfaces: */
export interface IAddAccount extends Action {
  type: typeof ADD_ACCOUNT;
  id: string;
}

export interface IUpdateAccountName extends Action {
  type: typeof UPDATE_ACCOUNT_NAME;
  id: string;
  name: string;
}

export interface IUpdateAccountBalance extends Action {
  type: typeof UPDATE_ACCOUNT_BALANCE;
  id: string;
  balance: number;
}

export interface IUpdateAccountNotes extends Action {
  type: typeof UPDATE_ACCOUNT_NOTES;
  id: string;
  notes: string;
}

export interface IToggleAccountDetails extends Action {
  type: typeof TOGGLE_ACCOUNT_DETAILS;
  id: string;
}

/* Supported Actions: */
export type ActionTypes =
  IAddAccount
  | IUpdateAccountName
  | IUpdateAccountBalance
  | IUpdateAccountNotes
  | IToggleAccountDetails;
