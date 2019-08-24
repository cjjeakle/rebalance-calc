import * as ActionTypes from "../types/listTypes";
import * as AccountTypes from "../types/accountTypes";
import * as AssetTypes from "../types/assetTypes";

export function addElement(listId: AssetTypes.AssetListNames, payload: AssetTypes.IAsset): ActionTypes.IAddElement<AssetTypes.AssetListNames, AssetTypes.IAsset>
export function addElement(listId: AccountTypes.AccountListNames, payload: AccountTypes.IAccount): ActionTypes.IAddElement<AccountTypes.AccountListNames, AccountTypes.IAccount>
export function addElement(listId: string, payload: any): ActionTypes.IAddElement<string, any> {
  return {
    type: ActionTypes.ADD_ELEMENT,
    listId,
    payload
  };
}

export function updateElement(listId: AssetTypes.AssetListNames, index: number, payload: AssetTypes.IAsset): ActionTypes.IUpdateElement<AssetTypes.AssetListNames, AssetTypes.IAsset>
export function updateElement(listId: AccountTypes.AccountListNames, index: number, payload: AccountTypes.IAccount): ActionTypes.IUpdateElement<AccountTypes.AccountListNames, AccountTypes.IAccount>
export function updateElement(listId: string, index: number, payload: any): ActionTypes.IUpdateElement<string, any> {
  return {
    type: ActionTypes.UPDATE_ELEMENT,
    listId,
    index,
    payload
  };
}

export function moveElement(listId: AssetTypes.AssetListNames, prevIndex: number, newIndex: number): ActionTypes.IMoveElement<AssetTypes.AssetListNames>
export function moveElement(listId: AccountTypes.AccountListNames, prevIndex: number, newIndex: number): ActionTypes.IMoveElement<AccountTypes.AccountListNames>
export function moveElement(listId: string, prevIndex: number, newIndex: number): ActionTypes.IMoveElement<string> {
  return {
    type: ActionTypes.MOVE_ELEMENT,
    listId,
    prevIndex,
    newIndex
  }
}

export function removeElement(listId: AssetTypes.AssetListNames, index: number): ActionTypes.IRemoveElement<AssetTypes.AssetListNames>
export function removeElement(listId: AccountTypes.AccountListNames, index: number): ActionTypes.IRemoveElement<AccountTypes.AccountListNames>
export function removeElement(listId: string, index: number): ActionTypes.IRemoveElement<string> {
  return {
    type: ActionTypes.REMOVE_ELEMENT,
    listId,
    index
  }
}
