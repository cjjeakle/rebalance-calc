import { Action } from "redux";

/* State: */
export type AssetListNames = "assetsRegular" | "assetsInefficient" | "assetsAdvantaged";

export interface IAsset {
  name: string;
  allocation: number;
  notes: string;
  showDetails: boolean;
}

export interface IAssetsState {
  [id: string]: IAsset;
}

/* Actions: */
export const ADD_ASSET = "ADD_ASSET";
export const UPDATE_ASSET_NAME = "UPDATE_ASSET_NAME";
export const UPDATE_ASSET_ALLOCATION = "UPDATE_ASSET_ALLOCATION";
export const UPDATE_ASSET_NOTES = "UPDATE_ASSET_NOTES";
export const TOGGLE_ASSET_DETAILS = "TOGGLE_ASSET_DETAILS";

/* Action Interfaces: */
export interface IAddAsset extends Action {
  type: typeof ADD_ASSET;
  id: string;
}

export interface IUpdateAssetName extends Action {
  type: typeof UPDATE_ASSET_NAME;
  id: string;
  name: string;
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

export interface IToggleAssetDetails extends Action {
  type: typeof TOGGLE_ASSET_DETAILS;
  id: string;
}

/* Supported Actions: */
export type ActionTypes =
  IAddAsset
  | IUpdateAssetName
  | IUpdateAssetAllocation
  | IUpdateAssetNotes
  | IToggleAssetDetails;
