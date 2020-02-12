import { Action } from "redux";

/* Actions: */
export const LOAD_EXAMPLE_DATA = "LOAD_EXAMPLE_DATA";

/* Action Interfaces: */
export interface ILoadExampleData extends Action {
  type: typeof LOAD_EXAMPLE_DATA;
}

/* Supported Actions: */
export type PersistenceActionTypes = ILoadExampleData;
