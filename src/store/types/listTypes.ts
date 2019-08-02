import { Action } from "redux";

export type ListState<T> = T[];

/* Actions: */
export const ADD_ELEMENT = "ADD_ELEMENT";
export const UPDATE_ELEMENT = "UPDATE_ELEMENT";
export const MOVE_ELEMENT = "MOVE_ELEMENT";
export const REMOVE_ELEMENT = "REMOVE_ELEMENT";

/* Action Interfaces: */
export interface IAddElement<ID, T> extends Action {
  type: typeof ADD_ELEMENT;
  listId: ID;
  payload: T;
}

export interface IUpdateElement<ID, T> extends Action {
  type: typeof UPDATE_ELEMENT;
  listId: ID;
  index: number
  payload: T;
}

export interface IMoveElement<ID> extends Action { 
  type: typeof MOVE_ELEMENT;
  listId: ID;
  prevIndex: number;
  newIndex: number;
}

export interface IRemoveElement<ID> extends Action {
  type: typeof REMOVE_ELEMENT;
  listId: ID;
  index: number;
}

/* Supported Actions: */
export type ListActionTypes<ID, T> = IAddElement<ID, T> | IUpdateElement<ID, T> | IMoveElement<ID> | IRemoveElement<ID>;
