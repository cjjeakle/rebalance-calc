import { AppState } from "../store";

interface IAssetSaveSchema {
  name: string;
  allocation: number;
  notes: string;
}

interface IAccountSaveSchema {
  name: string;
  balance: number;
  notes: string;
}

interface ISaveSchema {
  // Asset Classes
  assetClassesInefficient: IAssetSaveSchema[];
  assetClassesCredit: IAssetSaveSchema[];
  assetClassesEfficient: IAssetSaveSchema[];

  // Account Types
  accountsTaxable: IAccountSaveSchema[];
  accountsDeferred: IAccountSaveSchema[];
  accountsFree: IAccountSaveSchema[];
}


export function mapSaveToState(save: ISaveSchema): AppState {
  return {
    assets: {
      regular: save.assetClassesEfficient,
      advantaged: save.assetClassesCredit,
      inefficient: save.assetClassesInefficient
    },
    accounts: {
      regular: save.accountsTaxable,
      taxDeferred: save.accountsDeferred,
      taxExempt: save.accountsFree
    }
  };
}

export function mapStateToSave(state: AppState): ISaveSchema {
  return {
    assetClassesEfficient: state.assets.regular,
    assetClassesCredit: state.assets.advantaged,
    assetClassesInefficient: state.assets.inefficient,
    accountsTaxable: state.accounts.regular,
    accountsDeferred: state.accounts.taxDeferred,
    accountsFree: state.accounts.taxExempt
  };
}
