import * as AccountTypes from "../types/accountTypes";

export function addAccount(): AccountTypes.IAddAccount {
  return {
    type: AccountTypes.ADD_ACCOUNT
  };
}

export function updateAccountName(id: string, name: string): AccountTypes.IUpdateAccountName {
  return {
    type: AccountTypes.UPDATE_ACCOUNT_NAME,
    id,
    name
  }
}

export function updateAccountTaxTreatment(id: string, taxTreatment: AccountTypes.AccountTaxTreatmentT): AccountTypes.IUpdateAccountTaxTreatment {
  return {
    type: AccountTypes.UPDATE_ACCOUNT_TAX_TREATMENT,
    id,
    taxTreatment
  }
}

export function moveAccount(oldIndex: number, newIndex: number): AccountTypes.IMoveAccount {
  return {
    type: AccountTypes.MOVE_ACCOUNT,
    oldIndex,
    newIndex
  }
}

export function removeAccount(id: string): AccountTypes.IRemoveAccount {
  return {
    type: AccountTypes.REMOVE_ACCOUNT,
    id
  };
}
