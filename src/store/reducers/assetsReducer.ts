import { combineReducers } from "redux";
import uuid from "uuid";

import * as AssetTypes from "../types/assetTypes";
import { createNamedListReducer} from "./listReducer";

function assetsReducer(
  state: AssetTypes.IAssetsState = {},
  action: AssetTypes.ActionTypes
): AssetTypes.IAssetsState {
  switch (action.type) {
    case AssetTypes.ADD_ASSET:
      return {
        ...state,
        [uuid.v4()]: {
          name: "",
          allocation: "" as any,
          notes: "",
          showDetails: false
        }
      };
    case AssetTypes.UPDATE_ASSET_NAME:
      return {...state, [action.id]: { ...state[action.id], name: action.name } };
    case AssetTypes.UPDATE_ASSET_ALLOCATION:
      return {...state, [action.id]: { ...state[action.id], allocation: action.allocation } };
    case AssetTypes.UPDATE_ASSET_NOTES:
      return {...state, [action.id]: { ...state[action.id], notes: action.notes } };
    case AssetTypes.TOGGLE_ASSET_DETAILS:
      return {...state, [action.id]: { ...state[action.id], showDetails: !state[action.id].showDetails } };
    default:
      return state;
  }
}

export default combineReducers({
  assets: assetsReducer,
  regularList: createNamedListReducer<AssetTypes.AssetListNames>("assetsRegular"),
  inefficientList: createNamedListReducer<AssetTypes.AssetListNames>("assetsInefficient"),
  advantagedList: createNamedListReducer<AssetTypes.AssetListNames>("assetsAdvantaged")
});
