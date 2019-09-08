import { Action } from "redux";

/* State: */
export type ListStateT = string[];

/* Actions: */
export const ADD_ELEMENT = "ADD_ELEMENT";
export const MOVE_ELEMENT = "MOVE_ELEMENT";
export const REMOVE_ELEMENT = "REMOVE_ELEMENT";

/* Action Interfaces: */
export interface IAddElement<ID> extends Action {
  type: typeof ADD_ELEMENT;
  listId: ID;
  elementId: string;
}

export interface IMoveElement<ID> extends Action { 
  type: typeof MOVE_ELEMENT;
  listId: ID;
  elementId: string;
  newIndex: number;
}

export interface IRemoveElement<ID> extends Action {
  type: typeof REMOVE_ELEMENT;
  listId: ID;
  elementId: string;
}

/* Supported Actions: */
export type ActionTypes<ID> = IAddElement<ID> | IMoveElement<ID> | IRemoveElement<ID>;
