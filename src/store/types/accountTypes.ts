import { Action } from "redux";

export type AccountListNames = "accountRegular" | "accountTaxDeferred" | "accountTaxExempt"

export interface IAccount extends Action {
  name: string;
  balance: number;
  notes: string;
}
