import { Action } from "redux";
import { CoreAppStateT } from "../index";
import * as ActionTypes from "../types/persistenceTypes";
import { initialState as defaultUiState } from "../reducers/uiReducer";

function loadState(defaultState: CoreAppStateT): CoreAppStateT {
  if (window.location.hash) {
    let loadedState = JSON.parse(decodeURI(window.location.hash.substring(1)));
    // TODO: Check for compat, and set a UI flag to go to v1 backward compat here
    if (loadedState["accounts"]) { // Looks like the current schema
      return {
        ...defaultState,
        ...loadedState
      };
    } else if (loadedState["assetClassesInefficient"]) { // Looks like the old schema, don't load, but present a link to backward compat mode
      defaultState.uiState.backwardCompatLinkVisible = true;
      return defaultState;
    }
  }
  return defaultState;
}

function persistState(curState: CoreAppStateT) {
  let stateForPersistence = {
    accounts: curState.accounts,
    assets: curState.assets,
    holdings: curState.holdings
  }

  let stateHash = "#" + encodeURI(JSON.stringify(stateForPersistence));

  if (window.location.hash != stateHash) {
      history.replaceState({}, '', '/' + stateHash);
  }
}

export default function persistenceReducer (
  coreAppStateReducer: (state: CoreAppStateT, action: Action) => CoreAppStateT
): (state: CoreAppStateT, action: Action) => CoreAppStateT {
  return (state: CoreAppStateT, action: Action) => {
    switch (action.type) {
      case "@@INIT":
        return loadState(coreAppStateReducer(state, action));
      case ActionTypes.LOAD_EXAMPLE_DATA:
          state = {
            ...state,
            accounts: [],
            assets: [],
            holdings: {},
            uiState: defaultUiState
          };
          // vvv Intentional fall-through vvv
      default:
        let updatedState = coreAppStateReducer(state, action);
        if (updatedState.uiState.backwardCompatLinkVisible) {
          updatedState.uiState.backwardCompatLinkVisible = false; // Clear the backward compat banner if we're going to replace the legacy data in the URL
        }
        persistState(updatedState);
        return updatedState;
    }
  };
}
