import * as ActionTypes from "../types/assetTypes";

export function addAsset (taxCategory: ActionTypes.AssetTaxTreatment, asset: ActionTypes.IAsset): ActionTypes.IAddAsset {
  return {
    type: ActionTypes.ADD_ASSET,
    payload: {
      taxCategory,
      asset
    }
  };
}

export function moveAsset (taxCategory: ActionTypes.AssetTaxTreatment, prevIndex: number, newIndex: number): ActionTypes.IMoveAsset {
  return {
    type: ActionTypes.MOVE_ASSET,
    payload: {
      taxCategory,
      prevIndex,
      newIndex
    }
  }
}

export function removeAsset (taxCategory: ActionTypes.AssetTaxTreatment, index: number): ActionTypes.IRemoveAsset {
  return {
    type: ActionTypes.REMOVE_ASSET,
    payload: {
      taxCategory,
      index
    }
  }
}
