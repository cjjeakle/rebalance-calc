import * as ActionTypes from "../types/assetTypes";

export function addAsset(id: string): ActionTypes.IAddAsset {
  return {
    type: ActionTypes.ADD_ASSET,
    id
  };
}

export function updateAssetName(id: string, name: string): ActionTypes.IUpdateAssetName {
  return {
    type: ActionTypes.UPDATE_ASSET_NAME,
    id,
    name
  }
}

export function updateAssetAllocation(id: string, allocation: number): ActionTypes.IUpdateAssetAllocation {
  return {
    type: ActionTypes.UPDATE_ASSET_ALLOCATION,
    id,
    allocation
  }
}

export function updateAssetNotes(id: string, notes: string): ActionTypes.IUpdateAssetNotes {
  return {
    type: ActionTypes.UPDATE_ASSET_NOTES,
    id,
    notes
  }
}

export function toggleAssetDetails(id: string): ActionTypes.IToggleAssetDetails {
  return {
    type: ActionTypes.TOGGLE_ASSET_DETAILS,
    id
  }
}
