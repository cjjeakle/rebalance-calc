import ITaxConstrainedAction from "./taxConstrainedTypes";

export type AssetTaxTreatment = "Regular" | "Inefficient" | "Advantaged";

export interface IAsset {
  name: string;
  allocation: number;
  notes: string;
}

export type IAssetClassState = IAsset[];

export const ADD_ASSET = "ADD_ASSET";
export const MOVE_ASSET = "MOVE_ASSET";
export const REMOVE_ASSET = "REMOVE_ASSET";

export interface IAddAsset extends ITaxConstrainedAction {
  type: typeof ADD_ASSET;
  taxCategory: AssetTaxTreatment;
  asset: IAsset;
}

export interface IMoveAsset extends ITaxConstrainedAction {
  type: typeof MOVE_ASSET;
  taxCategory: AssetTaxTreatment;
  prevIndex: number;
  newIndex: number;
}

export interface IRemoveAsset extends ITaxConstrainedAction {
  type: typeof REMOVE_ASSET;
  taxCategory: AssetTaxTreatment;
  index: number;
}

export type AssetActionTypes = IAddAsset | IMoveAsset | IRemoveAsset;
