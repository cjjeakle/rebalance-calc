import * as ActionTypes from "../types/assetTypes";
import mapReducerToTaxCategory from "./wrapperReducer";
import { combineReducers } from "redux";

function assetClassReducer(
  state: ActionTypes.IAssetClassState = [],
  action: ActionTypes.AssetActionTypes
): ActionTypes.IAssetClassState {
  switch (action.type) {
    case ActionTypes.ADD_ASSET:
      return [...state, action.asset];
    case ActionTypes.MOVE_ASSET:
      let newState = [...state.slice(0, action.prevIndex), ...state.slice(action.prevIndex + 1)]
      return newState.splice(action.newIndex, 0, state[action.prevIndex]);
    case ActionTypes.REMOVE_ASSET:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
      return state;
  }
}

const assetsReducer = combineReducers({
  assetsRegular: mapReducerToTaxCategory<ActionTypes.AssetTaxTreatment>(assetClassReducer, "Regular"),
  assetsInefficient: mapReducerToTaxCategory<ActionTypes.AssetTaxTreatment>(assetClassReducer, "Inefficient"),
  assetsAdvantaged: mapReducerToTaxCategory<ActionTypes.AssetTaxTreatment>(assetClassReducer, "Advantaged")
});
export default assetsReducer;
