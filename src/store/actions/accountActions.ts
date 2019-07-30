import * as ActionTypes from "../types/accountTypes";

export function addAccount (taxCategory: ActionTypes.AccountTaxTreatment, account: ActionTypes.IAccount): ActionTypes.IAddAccount {
  return {
    type: ActionTypes.ADD_ACCOUNT,
    payload: {
      taxCategory,
      account
    }
  };
}

export function moveAccount (taxCategory: ActionTypes.AccountTaxTreatment, prevIndex: number, newIndex: number): ActionTypes.IMoveAccount {
  return {
    type: ActionTypes.MOVE_ACCOUNT,
    payload: {
      taxCategory,
      prevIndex,
      newIndex
    }
  }
}

export function removeAccount (taxCategory: ActionTypes.AccountTaxTreatment, index: number): ActionTypes.IRemoveAccount {
  return {
    type: ActionTypes.REMOVE_ACCOUNT,
    payload: {
      taxCategory,
      index
    }
  }
}
