import { Action } from "redux";

/* Actions: */
export const LOAD_SAVED_DATA = "LOAD_SAVED_DATA";
export const LOAD_EXAMPLE_DATA = "LOAD_EXAMPLE_DATA";

/* Action Interfaces: */
export interface ILoadSavedData extends Action {
  type: typeof LOAD_SAVED_DATA;
}
export interface ILoadExampleData extends Action {
  type: typeof LOAD_EXAMPLE_DATA;
}

/* Supported Actions: */
export type PersistenceActionTypes = ILoadSavedData | ILoadExampleData;
