import { AppState } from "../store";

interface IAssetV1 {
  name: string;
  allocation: number;
  notes: string;
}

interface IAccountV1 {
  name: string;
  balance: number;
  notes: string;
}

interface IStateV1 {
  // Schema Version wasn't defined in the initial release
  version: null;

  // Asset Classes
  assetClassesInefficient: IAssetV1[];
  assetClassesCredit: IAssetV1[];
  assetClassesEfficient: IAssetV1[];

  // Account Types
  accountsTaxable: IAccountV1[];
  accountsDeferred: IAccountV1[];
  accountsFree: IAccountV1[];
}

type IValidSchema = IStateV1 | AppState;

export function loadStateFromSave(state: IValidSchema): AppState {
  switch (state.version) {
    case null:
      return mapV1ToCur(<IStateV1>state);
    case "2":
      return <AppState>state;
    default:
      throw "Invalid save data!";
  }
}

export function mapV1ToCur(stateV1: IStateV1): AppState {
  return {
    version: "2",
    assets: {
      regular: stateV1.assetClassesEfficient,
      advantaged: stateV1.assetClassesCredit,
      inefficient: stateV1.assetClassesInefficient
    },
    accounts: {
      regular: stateV1.accountsTaxable,
      taxDeferred: stateV1.accountsDeferred,
      taxExempt: stateV1.accountsFree
    }
  };
}
