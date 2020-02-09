import { Action } from "redux";
import { CoreAppStateT } from "../index";
import { initialState } from "./uiReducer";

function loadState(): CoreAppStateT {
  let state: CoreAppStateT = {
    accounts: [],
    assets: [],
    holdings: {},
    uiState: initialState
  };

  if (window.location.hash) {
    let loadedState = JSON.parse(decodeURI(window.location.hash.substring(1)));
    // TODO: Check for compat, and set a UI flag to go to v1 backward compat here
    if (loadedState["accounts"]) {
      state = loadedState; // Looks like the current schema
    } else if (loadedState["assetClassesInefficient"]) {
      state.uiState.backwardCompatLinkVisible = true; // Looks like the old schema, don't load, but present a link to backward compat mode
    }
  }

  return state;
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
    let isAppStart: boolean = action.type == "@@INIT";
    if (isAppStart) {
      state = loadState()
    }
    let updatedState = coreAppStateReducer(state, action);
    if (!isAppStart) {
      if (state.uiState.backwardCompatLinkVisible) {
        state.uiState.backwardCompatLinkVisible = false; // Clear the backward compat banner if we're going to replace the legacy data in the URL
      }
      persistState(updatedState);
    }
    return updatedState;
  };
}
