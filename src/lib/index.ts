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
  const listState = {
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
  return {
    uiState: {
      aboutVisible: false,
      howItWorksVisible: false,
      tipsAndTricksVisible: false
    },
    lists: {
      past: [],
      present: listState,
      future: []
    }
  }
}

export function mapStateToSave(state: AppState): ISaveSchema {
  return {
    assetClassesEfficient: state.lists.present.assets.regular,
    assetClassesCredit: state.lists.present.assets.advantaged,
    assetClassesInefficient: state.lists.present.assets.inefficient,
    accountsTaxable: state.lists.present.accounts.regular,
    accountsDeferred: state.lists.present.accounts.taxDeferred,
    accountsFree: state.lists.present.accounts.taxExempt
  };
}
