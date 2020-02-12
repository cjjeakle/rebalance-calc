import * as ActionTypes from "../types/persistenceTypes";

export function loadSavedData(): ActionTypes.ILoadSavedData {
  return {
    type: ActionTypes.LOAD_SAVED_DATA
  };
}

export function loadExampleData(): ActionTypes.ILoadExampleData {
  return {
    type: ActionTypes.LOAD_EXAMPLE_DATA
  };
}
