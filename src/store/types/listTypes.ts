export type ListState<T> = T[];

/* Actions: */
export const ADD_TO_LIST = "ADD_TO_LIST";
export const MOVE_IN_LIST = "MOVE_IN_LIST";
export const REMOVE_FROM_LIST = "REMOVE_FROM_LIST";

/* Action Interfaces: */
export interface IAddToList<ID, T> {
  type: typeof ADD_TO_LIST;
  listId: ID;
  payload: T;
}

export interface IMoveInList<ID> { 
  type: typeof MOVE_IN_LIST;
  listId: ID;
  prevIndex: number;
  newIndex: number;
}

export interface IRemoveFromList<ID> {
  type: typeof REMOVE_FROM_LIST;
  listId: ID;
  index: number;
}

/* Supported Actions: */
export type ListActionTypes<ID, T> = IAddToList<ID, T> | IMoveInList<ID> | IRemoveFromList<ID>;
