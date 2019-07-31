import * as ActionTypes from "../types/listTypes";

export function listReducer<T, ID>(
  state: ActionTypes.ListState<T> = [],
  action: ActionTypes.ListActionTypes<T, ID>
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

export function createNamedListReducer<T, ID>(
  reducer: (state: ActionTypes.ListState<T>, action: ActionTypes.ListActionTypes<T, ID>) => ActionTypes.ListState<T>,  
  listId: ID
): (state: ActionTypes.ListState<T>, action: ActionTypes.ListActionTypes<T, ID>) => ActionTypes.ListState<T> {
  return (state: ActionTypes.ListState<T>, action: ActionTypes.ListActionTypes<T, ID>) => {
    const isInitializationCall = (state === undefined);
    if (action.listId === listId && !isInitializationCall) {
      return state;
    }

    // If this wrapper's name and hierarchy level match the one assigned to this reducer, call it 
    return reducer(state, action);
  }
}
