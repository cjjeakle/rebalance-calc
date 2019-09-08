import * as ActionTypes from "../types/listTypes";

export function listReducer<ID>(
  state: ActionTypes.ListStateT = [],
  action: ActionTypes.ActionTypes<ID>
): ActionTypes.ListStateT {
  switch (action.type) {
    case ActionTypes.ADD_ELEMENT:
      return [...state, action.elementId];
    case ActionTypes.MOVE_ELEMENT:
      let newState = state.filter(element => element !== action.elementId);
      return newState.splice(action.newIndex, 0, action.elementId);
    case ActionTypes.REMOVE_ELEMENT:
      return state.filter(element => element !== action.elementId);
    default:
      return state;
  }
}

export type ListReducerT<ID> = (state: ActionTypes.ListStateT, action: ActionTypes.ActionTypes<ID>) => ActionTypes.ListStateT

export function createNamedListReducer<T extends string>(listId: T): ListReducerT<T> {
  return (state: ActionTypes.ListStateT, action: ActionTypes.ActionTypes<T>) => {
    const isInitializationCall = (state === undefined);
    if (action.listId !== listId && !isInitializationCall) {
      return state;
    }

    // If this wrapper's listId matches the one the action is requesting, pass this action to the reducer 
    return listReducer(state, action);
  }
}
