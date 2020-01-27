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
          taxTreatment: null
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
    case AccountTypes.REMOVE_ACCOUNT:
      return state.filter(account => account.id !== action.id);
    default:
      return state;
  }
}
