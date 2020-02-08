import { Action } from "redux";
import { CoreAppStateT } from "../index";

function loadState(): CoreAppStateT {
  let stateJSON = JSON.stringify(<CoreAppStateT>{
    accounts: [],
    assets: [],
    holdings: {}
  });

  if (window.location.hash) {
      stateJSON = decodeURI(window.location.hash.substring(1));
  }

  return JSON.parse(stateJSON);
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
    if (state == undefined) {
      state = loadState()
    }
    let updatedState = coreAppStateReducer(state, action);
    persistState(updatedState);
    return updatedState;
  };
}
