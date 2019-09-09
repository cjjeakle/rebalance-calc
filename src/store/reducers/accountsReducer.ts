import { combineReducers } from "redux";
import uuid from "uuid";

import * as AccountTypes from "../types/accountTypes";
import { createNamedListReducer} from "./listReducer";

function accountsReducer(
  state: AccountTypes.IAccountsState = {},
  action: AccountTypes.ActionTypes
): AccountTypes.IAccountsState {
  switch (action.type) {
    case AccountTypes.ADD_ACCOUNT:
      return {
        ...state,
        [uuid.v4()]: {
          name: "",
          balance: "" as any,
          notes: "",
          showDetails: false
        }
      };
    case AccountTypes.UPDATE_ACCOUNT_NAME:
      return {...state, [action.id]: { ...state[action.id], name: action.name } };
    case AccountTypes.UPDATE_ACCOUNT_BALANCE:
      return {...state, [action.id]: { ...state[action.id], balance: action.balance } };
    case AccountTypes.UPDATE_ACCOUNT_NOTES:
      return {...state, [action.id]: { ...state[action.id], notes: action.notes } };
    case AccountTypes.TOGGLE_ACCOUNT_DETAILS:
      return {...state, [action.id]: { ...state[action.id], showDetails: !state[action.id].showDetails } };
    default:
      return state;
  }
}

export default combineReducers({
  allAccounts: accountsReducer,
  regular: createNamedListReducer<AccountTypes.AccountListNames>("accountRegular"),
  taxDeferred: createNamedListReducer<AccountTypes.AccountListNames>("accountTaxDeferred"),
  taxExempt: createNamedListReducer<AccountTypes.AccountListNames>("accountTaxExempt")
});
