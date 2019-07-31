import * as ActionTypes from "../types/listTypes";
import * as AccountTypes from "../types/accountTypes";
import * as AssetTypes from "../types/assetTypes";

export function listReducer<ID, T>(
  state: ActionTypes.ListState<T> = [],
  action: ActionTypes.ListActionTypes<ID, T>
): ActionTypes.ListState<T> {
  switch (action.type) {
    case ActionTypes.ADD_TO_LIST:
      return [...state, action.payload];
    case ActionTypes.MOVE_IN_LIST:
      let newState = [...state.slice(0, action.prevIndex), ...state.slice(action.prevIndex + 1)]
      return newState.splice(action.newIndex, 0, state[action.prevIndex]);
    case ActionTypes.REMOVE_FROM_LIST:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
      return state;
  }
}

export type ListReducerT<ID, T> = (state: ActionTypes.ListState<T>, action: ActionTypes.ListActionTypes<ID, T>) => ActionTypes.ListState<T>

export function createNamedListReducer(listId: AssetTypes.AssetListNames): ListReducerT<AssetTypes.AssetListNames, AssetTypes.IAsset>
export function createNamedListReducer(listId: AccountTypes.AccountListNames): ListReducerT<AccountTypes.AccountListNames, AccountTypes.IAccount>
export function createNamedListReducer(listId: string): ListReducerT<string, any> {
  return (state: ActionTypes.ListState<any>, action: ActionTypes.ListActionTypes<string, any>) => {
    const isInitializationCall = (state === undefined);
    if (action.listId === listId && !isInitializationCall) {
      return state;
    }

    // If this wrapper's listId matches the one the action is requesting, pass this action to the reducer 
    return listReducer(state, action);
  }
}
