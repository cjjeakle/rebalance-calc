import uuid from "uuid";

import * as AssetTypes from "../types/assetTypes";

export default function assetsReducer(
  state: AssetTypes.AssetStateT = [],
  action: AssetTypes.ActionTypes
): AssetTypes.AssetStateT {
  switch (action.type) {
    case AssetTypes.ADD_ASSET:
      return [
        ...state,
        {
          id: uuid.v4(),
          name: "",
          taxTreatment: undefined,
          allocation: undefined,
          notes: ""
        }
      ];
    case AssetTypes.UPDATE_ASSET_NAME:
      return state.map(asset =>
        asset.id === action.id ? { ...asset, name: action.name } : asset
      );
    case AssetTypes.UPDATE_ASSET_TAX_TREATMENT:
      return state.map(asset =>
        asset.id === action.id ? { ...asset, taxTreatment: action.taxTreatment } : asset
      );
    case AssetTypes.UPDATE_ASSET_ALLOCATION:
      return state.map(asset =>
        asset.id === action.id ? { ...asset, allocation: action.allocation } : asset
      );
    case AssetTypes.UPDATE_ASSET_NOTES:
      return state.map(asset =>
        asset.id === action.id ? { ...asset, notes: action.notes } : asset
      );
    case AssetTypes.MOVE_ASSET:
      let newState = [...state];
      newState.splice(action.oldIndex, 1); // Remove at the old index
      newState.splice(action.newIndex, 0, state[action.oldIndex]); // Insert at the new index
      return newState;
    case AssetTypes.REMOVE_ASSET:
      return state.filter(asset => asset.id !== action.id);
    default:
      return state;
  }
}
