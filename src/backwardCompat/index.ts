import { ISchemaVersion } from "../store/types/versionTypes";
import { IAssetsState } from "../store/types/assetTypes";
import { IAccountState } from "../store/types/accountTypes";

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
  schemaVersion: null;

  // Asset Classes
  assetClassesInefficient: IAssetV1[];
  assetClassesCredit: IAssetV1[];
  assetClassesEfficient: IAssetV1[];

  // Account Types
  accountsTaxable: IAccountV1[];
  accountsDeferred: IAccountV1[];
  accountsFree: IAccountV1[];
}

type ICurSchema = ISchemaVersion & IAssetsState & IAccountState;
type IValidSchema = IStateV1 | ICurSchema;

export function loadStateFromSave(state: IValidSchema): ICurSchema {
  switch (state.schemaVersion) {
    case null:
      return mapV1ToCur(<IStateV1>state);
    case "2":
      return <ICurSchema>state;
    default:
      throw "Invalid save data!";
  }
}

export function mapV1ToCur(stateV1: IStateV1): ICurSchema {
  return {
    schemaVersion: "2",
    assetsRegular: stateV1.assetClassesEfficient,
    assetsAdvantaged: stateV1.assetClassesCredit,
    assetsInefficient: stateV1.assetClassesInefficient,
    accountsRegular: stateV1.accountsTaxable,
    accountsDeferred: stateV1.accountsDeferred,
    accountsExempt: stateV1.accountsFree,
  };
}
