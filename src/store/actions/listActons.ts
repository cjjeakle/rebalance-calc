import * as ActionTypes from "../types/listTypes";
import * as AccountTypes from "../../core_types/accountTypes";
import * as AssetTypes from "../../core_types/assetTypes";

export type SupportedPayload = AccountTypes.IAccount | AssetTypes.IAsset;
export type SupportedListIDs = AccountTypes.AccountListTypes | AssetTypes.AssetListTypes;

export function addData<T, ID>(listId: ID, payload: T): ActionTypes.IAddToList<T, ID> {
  return {
    type: ActionTypes.ADD_TO_LIST,
    listId,
    payload
  };
}

export function moveAccount<ID> (listId: ID, prevIndex: number, newIndex: number): ActionTypes.IMoveInList<ID> {
  return {
    type: ActionTypes.MOVE_IN_LIST,
    listId,
    prevIndex,
    newIndex
  }
}

export function removeAccount<ID> (listId: ID, index: number): ActionTypes.IRemoveFromList<ID> {
  return {
    type: ActionTypes.REMOVE_FROM_LIST,
    listId,
    index
  }
}
