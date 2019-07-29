import * as ActionTypes from "../actions/types";

export function addTaxInefficientAsset (): ActionTypes.IAddTaxInefficientAsset {
  return {
    type: ActionTypes.ADD_TAX_INEFFICIENT_ASSET,
    payload: ActionTypes.IAssetClass
  };
}