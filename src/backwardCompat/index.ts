import * as StoreTypes from "../store/types";

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

type IPrevSchema = IStateV1;
type ICurSchema = StoreTypes.ISchemaVersion & StoreTypes.IAssetsState & StoreTypes.IAccountState;

export function mapV1ToCur(stateV1: IPrevSchema): ICurSchema {
    return {
        schemaVersion: "2",
        assetsInefficient: stateV1.assetClassesInefficient,
        assetsAdvantaged: stateV1.assetClassesCredit,
        assetsRegular: stateV1.assetClassesEfficient
    }
}
