import uuid from "uuid";

import * as AccountTypes from "../types/accountTypes";

export default function accountsReducer(
  state: AccountTypes.AccountStateT = [],
  action: AccountTypes.ActionTypes
): AccountTypes.AccountStateT {
  switch (action.type) {
    case AccountTypes.ADD_ACCOUNT:
      return [
        ...state,
        {
          id: uuid.v4(),
          name: "",
          taxTreatment: undefined
        }
      ];
    case AccountTypes.UPDATE_ACCOUNT_NAME:
      return state.map(account =>
        account.id === action.id ? { ...account, name: action.name } : account
      );
    case AccountTypes.UPDATE_ACCOUNT_TAX_TREATMENT:
      return state.map(account =>
        account.id === action.id ? { ...account, taxTreatment: action.taxTreatment } : account
      );
    case AccountTypes.MOVE_ACCOUNT:
      let newState = [...state];
      newState.splice(action.oldIndex, 1); // Remove
      if (action.newIndex === -1) {
        newState.push(state[action.oldIndex]); // Append to end
      } else {
        newState.splice(action.newIndex, 0, state[action.oldIndex]); // Move to specified index, push that element out 1
      }
      return newState;
    case AccountTypes.REMOVE_ACCOUNT:
      return state.filter(account => account.id !== action.id);
    default:
      return state;
  }
}
