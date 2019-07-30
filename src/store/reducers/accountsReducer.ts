import * as ActionTypes from "../types/accountTypes";
import mapReducerToTaxCategory from "./wrapperReducer";
import { combineReducers } from "redux";

function accountClassReducer(
  state: ActionTypes.IAccountCategoryState = [],
  action: ActionTypes.AccountActionTypes
): ActionTypes.IAccountCategoryState {
  switch (action.type) {
    case ActionTypes.ADD_ACCOUNT:
      return [...state, action.account];
    case ActionTypes.MOVE_ACCOUNT:
      let newState = [...state.slice(0, action.prevIndex), ...state.slice(action.prevIndex + 1)]
      return newState.splice(action.newIndex, 0, state[action.prevIndex]);
    case ActionTypes.REMOVE_ACCOUNT:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
      return state;
  }
}

const accountsReducer = combineReducers({
  accountsRegular: mapReducerToTaxCategory<ActionTypes.AccountTaxTreatment>(accountClassReducer, "Regular"),
  accountsTaxDeferred: mapReducerToTaxCategory<ActionTypes.AccountTaxTreatment>(accountClassReducer, "TaxDeferred"),
  accountsTaxExempt: mapReducerToTaxCategory<ActionTypes.AccountTaxTreatment>(accountClassReducer, "TaxExempt")
});
export default accountsReducer;
