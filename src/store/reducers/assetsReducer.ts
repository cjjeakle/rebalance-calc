import { createNamedListReducer} from "./listReducer";
import { combineReducers } from "redux";

const assetsReducer = combineReducers({
  regular: createNamedListReducer("assetsRegular"),
  inefficient: createNamedListReducer("assetsInefficient"),
  advantaged: createNamedListReducer("assetsAdvantaged")
});
export default assetsReducer;
