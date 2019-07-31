import { createNamedListReducer} from "./listReducer";
import { combineReducers } from "redux";

const accountsReducer = combineReducers({
  regular: createNamedListReducer("accountRegular"),
  taxDeferred: createNamedListReducer("accountTaxDeferred"),
  taxExempt: createNamedListReducer("accountTaxExempt")
});
export default accountsReducer;
