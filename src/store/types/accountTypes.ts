import ITaxConstrainedAction from "./taxConstrainedTypes";

export type AccountTaxTreatment = "Regular" | "TaxDeferred" | "TaxExempt";

export interface IAccount {
  name: string;
  balance: number;
  notes: string;
}

export type IAccountCategoryState = IAccount[];

export const ADD_ACCOUNT = "ADD_ACCOUNT";
export const MOVE_ACCOUNT = "MOVE_ACCOUNT";
export const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";

export interface IAddAccount extends ITaxConstrainedAction {
  type: typeof ADD_ACCOUNT;
  taxCategory: AccountTaxTreatment;
  account: IAccount;
}

export interface IMoveAccount extends ITaxConstrainedAction { 
  type: typeof MOVE_ACCOUNT;
  taxCategory: AccountTaxTreatment;
  prevIndex: number;
  newIndex: number;
}

export interface IRemoveAccount extends ITaxConstrainedAction {
  type: typeof REMOVE_ACCOUNT;
  taxCategory: AccountTaxTreatment;
  index: number;
}

export type AccountActionTypes = IAddAccount | IMoveAccount | IRemoveAccount;
