export type AccountListTypes = "accountRegular" | "accountTaxDeferred" | "accountTaxExempt";

export interface IAccount {
  name: string;
  balance: number;
  notes: string;
}

