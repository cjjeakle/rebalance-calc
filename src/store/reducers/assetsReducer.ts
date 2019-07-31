import * as ActionTypes from "../types/assetTypes";
import { listReducer, createNamedListReducer} from "./listReducer";
import { combineReducers } from "redux";

const assetsReducer = combineReducers({
  regular: createNamedListReducer<ActionTypes.IAsset, ActionTypes.AssetListTypes>(listReducer, "assetsRegular"),
  inefficient: createNamedListReducer<ActionTypes.IAsset, ActionTypes.AssetListTypes>(listReducer, "assetsInefficient"),
  advantaged: createNamedListReducer<ActionTypes.IAsset, ActionTypes.AssetListTypes>(listReducer, "assetsAdvantaged")
});
export default assetsReducer;
