import { Action } from "redux";

/* State: */
export type AssetTaxTreatmentT = "regular" | "inefficient" | "advantaged";

export interface IAsset {
  id: string;
  name: string;
  taxTreatment: AssetTaxTreatmentT;
  allocation: number;
  notes: string;
}

export type AssetStateT = IAsset[];

/* Actions: */
export const ADD_ASSET = "ADD_ASSET";
export const UPDATE_ASSET_NAME = "UPDATE_ASSET_NAME";
export const UPDATE_ASSET_TAX_TREATMENT = "UPDATE_ASSET_TAX_TREATMENT";
export const UPDATE_ASSET_ALLOCATION = "UPDATE_ASSET_ALLOCATION";
export const UPDATE_ASSET_NOTES = "UPDATE_ASSET_NOTES";
export const MOVE_ASSET = "MOVE_ASSET";
export const REMOVE_ASSET = "REMOVE_ASSET";

/* Action Interfaces: */
export interface IAddAsset extends Action {
  type: typeof ADD_ASSET;
}

export interface IUpdateAssetName extends Action {
  type: typeof UPDATE_ASSET_NAME;
  id: string;
  name: string;
}

export interface IUpdateAssetTaxTreatment extends Action {
  type: typeof UPDATE_ASSET_TAX_TREATMENT;
  id: string;
  taxTreatment: AssetTaxTreatmentT;
}

export interface IUpdateAssetAllocation extends Action {
  type: typeof UPDATE_ASSET_ALLOCATION;
  id: string;
  allocation: number;
}

export interface IUpdateAssetNotes extends Action {
  type: typeof UPDATE_ASSET_NOTES;
  id: string;
  notes: string;
}

export interface IMoveAsset extends Action {
  type: typeof MOVE_ASSET;
  oldIndex: number;
  newIndex: number;
}

export interface IRemoveAsset extends Action {
  type: typeof REMOVE_ASSET;
  id: string;
}

/* Supported Actions: */
export type ActionTypes =
  IAddAsset
  | IUpdateAssetName
  | IUpdateAssetTaxTreatment
  | IUpdateAssetAllocation
  | IUpdateAssetNotes
  | IMoveAsset
  | IRemoveAsset;
