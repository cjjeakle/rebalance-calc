import * as ActionTypes from "../types/listTypes";

export function addElement(listId: string, elementId: string): ActionTypes.IAddElement<string> {
  return {
    type: ActionTypes.ADD_ELEMENT,
    listId,
    elementId
  };
}

export function moveElement(listId: string, elementId: string, newIndex: number): ActionTypes.IMoveElement<string> {
  return {
    type: ActionTypes.MOVE_ELEMENT,
    listId,
    elementId,
    newIndex
  }
}

export function removeElement(listId: string, elementId: string): ActionTypes.IRemoveElement<string> {
  return {
    type: ActionTypes.REMOVE_ELEMENT,
    listId,
    elementId
  }
}
