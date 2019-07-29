import * as ActionTypes from "./types";

export function addTaxInefficientAsset (assetClass: ActionTypes.IAssetClass): ActionTypes.IAddTaxInefficientAsset {
  return {
    type: ActionTypes.ADD_TAX_INEFFICIENT_ASSET,
    payload: assetClass
  };
}

export function addTaxAdvantagedAsset (assetClass: ActionTypes.IAssetClass): ActionTypes.IAddTaxAdvantagedAsset {
  return {
    type: ActionTypes.ADD_TAX_ADVANTAGED_ASSET,
    payload: assetClass
  };
}

export function addRegularAsset (assetClass: ActionTypes.IAssetClass): ActionTypes.IAddRegularAsset {
  return {
    type: ActionTypes.ADD_REGULAR_ASSET,
    payload: assetClass
  };
}
