import { Action } from "redux";

export type AccountTaxTreatmentT = "regular" | "deferred" | "exempt"

export interface IAccount {
  id: string;
  name: string;
  taxTreatment: AccountTaxTreatmentT;
}

export type AccountStateT = IAccount[];

/* Actions: */
export const ADD_ACCOUNT = "ADD_ACCOUNT";
export const UPDATE_ACCOUNT_TAX_TREATMENT = "UPDATE_ACCOUNT_TAX_TREATMENT";
export const UPDATE_ACCOUNT_NAME = "UPDATE_ACCOUNT_NAME";
export const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";
export const INIT_ACCOUNT_HOLDINGS = "";

/* Action Interfaces: */
export interface IAddAccount extends Action {
  type: typeof ADD_ACCOUNT;
}

export interface IUpdateAccountName extends Action {
  type: typeof UPDATE_ACCOUNT_NAME;
  id: string;
  name: string;
}

export interface IUpdateAccountTaxTreatment extends Action {
  type: typeof UPDATE_ACCOUNT_TAX_TREATMENT;
  id: string;
  taxTreatment: AccountTaxTreatmentT;
}

export interface IRemoveAccount extends Action {
  type: typeof REMOVE_ACCOUNT;
  id: string;
}

/* Supported Actions: */
export type ActionTypes =
  IAddAccount
  | IUpdateAccountName
  | IUpdateAccountTaxTreatment
  | IRemoveAccount;
