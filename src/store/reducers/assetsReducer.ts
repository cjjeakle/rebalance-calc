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
      let movedFromIndex = state.findIndex(asset => asset.id === action.id);
      let movedBeforeIndex = state.findIndex(asset => asset.id === action.movedBeforeId);
      newState.splice(movedFromIndex, 1); // Remove
      if (movedBeforeIndex === -1) {
        newState.push(state[movedFromIndex]); // Append to end
      } else {
        newState.splice(movedBeforeIndex, 0, state[movedFromIndex]); // Move to specified index, push that element out 1
      }
      return newState;
    case AssetTypes.REMOVE_ASSET:
      return state.filter(asset => asset.id !== action.id);
    default:
      return state;
  }
}
