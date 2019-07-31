import * as ActionTypes from "../types/accountTypes";
import { listReducer, createNamedListReducer} from "./listReducer";
import { combineReducers } from "redux";

const accountsReducer = combineReducers({
  regular: createNamedListReducer<ActionTypes.IAccount, ActionTypes.AccountListTypes>(listReducer, "accountRegular"),
  taxDeferred: createNamedListReducer<ActionTypes.IAccount, ActionTypes.AccountListTypes>(listReducer, "accountTaxDeferred"),
  taxExempt: createNamedListReducer<ActionTypes.IAccount, ActionTypes.AccountListTypes>(listReducer, "accountTaxExempt")
});
export default accountsReducer;
