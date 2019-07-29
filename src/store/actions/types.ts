export interface IAssetClass {
    name: string;
    allocation: number;
    notes: string;
}

export interface IAssetsState {
    assetsInefficient: IAssetClass[];
    assetsAdvantaged: IAssetClass[];
    assetsRegular: IAssetClass[];
}

export interface IAccount {
    name: string;
    balance: number;
    notes: string;
}

export const ADD_TAX_INEFFICIENT_ASSET = "ADD_TAX_INEFFICIENT_ASSET";
export const ADD_TAX_ADVANTAGED_ASSET = "ADD_TAX_ADVANTAGED_ASSET";
export const ADD_REGULAR_ASSET = "ADD_REGULAR_ASSET";

export interface IAddTaxInefficientAsset {
    type: typeof ADD_TAX_INEFFICIENT_ASSET;
    payload: IAssetClass;
}

export interface IAddTaxAdvantagedAsset {
    type: typeof ADD_TAX_ADVANTAGED_ASSET;
    payload: IAssetClass;
}

export interface IAddRegularAsset {
    type: typeof ADD_REGULAR_ASSET;
    payload: IAssetClass;
}

export type AssetActionTypes = IAddTaxInefficientAsset | IAddTaxAdvantagedAsset | IAddRegularAsset;






export const REMOVE_TAX_INEFFICIENT_ASSET = "REMOVE_TAX_INEFFICIENT_ASSET";
export const REMOVE_TAX_ADVANTAGED_ASSET = "REMOVE_TAX_ADVANTAGED_ASSET";
export const REMOVE_REGULAR_ASSET = "REMOVE_REGULAR_ASSET";

