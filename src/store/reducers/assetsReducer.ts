import { createNamedListReducer} from "./listReducer";
import { combineReducers } from "redux";

export default combineReducers({
  regular: createNamedListReducer("assetsRegular"),
  inefficient: createNamedListReducer("assetsInefficient"),
  advantaged: createNamedListReducer("assetsAdvantaged")
});
