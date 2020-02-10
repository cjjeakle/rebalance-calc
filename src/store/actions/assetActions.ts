import * as AssetTypes from "../types/assetTypes";

export function addAsset(): AssetTypes.IAddAsset {
  return {
    type: AssetTypes.ADD_ASSET
  };
}

export function updateAssetName(id: string, name: string): AssetTypes.IUpdateAssetName {
  return {
    type: AssetTypes.UPDATE_ASSET_NAME,
    id,
    name
  };
}

export function updateAssetTaxTreatment(id: string, taxTreatment: AssetTypes.AssetTaxTreatmentT): AssetTypes.IUpdateAssetTaxTreatment {
  return {
    type: AssetTypes.UPDATE_ASSET_TAX_TREATMENT,
    id,
    taxTreatment
  }
}

export function updateAssetAllocation(id: string, allocation: number): AssetTypes.IUpdateAssetAllocation {
  return {
    type: AssetTypes.UPDATE_ASSET_ALLOCATION,
    id,
    allocation
  }
}

export function updateAssetNotes(id: string, notes: string): AssetTypes.IUpdateAssetNotes {
  return {
    type: AssetTypes.UPDATE_ASSET_NOTES,
    id,
    notes
  }
}

export function moveAsset(oldIndex: number, newIndex: number): AssetTypes.IMoveAsset {
  return {
    type: AssetTypes.MOVE_ASSET,
    oldIndex,
    newIndex
  }
}

export function removeAsset(id: string): AssetTypes.IRemoveAsset {
  return {
    type: AssetTypes.REMOVE_ASSET,
    id
  }
}
