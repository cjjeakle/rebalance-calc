import * as ActionTypes from "../types/accountTypes";

export function addAccount(id: string): ActionTypes.IAddAccount {
  return {
    type: ActionTypes.ADD_ACCOUNT,
    id
  };
}

export function updateAccountName(id: string, name: string): ActionTypes.IUpdateAccountName {
  return {
    type: ActionTypes.UPDATE_ACCOUNT_NAME,
    id,
    name
  }
}

export function updateAccountBalance(id: string, balance: number): ActionTypes.IUpdateAccountBalance {
  return {
    type: ActionTypes.UPDATE_ACCOUNT_BALANCE,
    id,
    balance
  }
}

export function updateAccountNotes(id: string, notes: string): ActionTypes.IUpdateAccountNotes {
  return {
    type: ActionTypes.UPDATE_ACCOUNT_NOTES,
    id,
    notes
  }
}

export function toggleAccountDetails(id: string): ActionTypes.IToggleAccountDetails {
  return {
    type: ActionTypes.TOGGLE_ACCOUNT_DETAILS,
    id
  }
}
