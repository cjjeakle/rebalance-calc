export type AccountListNames = "accountRegular" | "accountTaxDeferred" | "accountTaxExempt"

export interface IAccount {
  name: string;
  balance: number;
  notes: string;
  showDetails: boolean;
}
