import * as ActionTypes from "../types/listTypes";
import * as AccountTypes from "../types/accountTypes";
import * as AssetTypes from "../types/assetTypes";

export function addData(listId: AssetTypes.AssetListNames, payload: AssetTypes.IAsset): ActionTypes.IAddToList<AssetTypes.AssetListNames, AssetTypes.IAsset>
export function addData(listId: AccountTypes.AccountListNames, payload: AccountTypes.IAccount): ActionTypes.IAddToList<AccountTypes.AccountListNames, AccountTypes.IAccount>
export function addData(listId: string, payload: any): ActionTypes.IAddToList<string, any> {
  return {
    type: ActionTypes.ADD_TO_LIST,
    listId,
    payload
  };
}

export function moveAccount(listId: AssetTypes.AssetListNames, prevIndex: number, newIndex: number): ActionTypes.IMoveInList<AssetTypes.AssetListNames>
export function moveAccount(listId: AccountTypes.AccountListNames, prevIndex: number, newIndex: number): ActionTypes.IMoveInList<AccountTypes.AccountListNames>
export function moveAccount(listId: string, prevIndex: number, newIndex: number): ActionTypes.IMoveInList<string> {
  return {
    type: ActionTypes.MOVE_IN_LIST,
    listId,
    prevIndex,
    newIndex
  }
}

export function removeAccount(listId: AssetTypes.AssetListNames, index: number): ActionTypes.IRemoveFromList<AssetTypes.AssetListNames>
export function removeAccount(listId: AccountTypes.AccountListNames, index: number): ActionTypes.IRemoveFromList<AccountTypes.AccountListNames>
export function removeAccount(listId: string, index: number): ActionTypes.IRemoveFromList<string> {
  return {
    type: ActionTypes.REMOVE_FROM_LIST,
    listId,
    index
  }
}
