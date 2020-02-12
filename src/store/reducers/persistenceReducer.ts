import { Action } from "redux";
import { CoreAppStateT } from "../index";
import * as ActionTypes from "../types/persistenceTypes";
import { initialState as defaultUiState } from "../reducers/uiReducer";

let exampleState: CoreAppStateT = {
  "uiState": {
    "backwardCompatLinkVisible": false,
    "aboutVisible": false,
    "howItWorksVisible": false,
    "tipsAndTricksVisible": true
  },
  "assets": [
    {
      "id": "aab1a816-2f9f-4a67-bcfd-32449601af4a",
      "name": "Deposits",
      "taxTreatment": "regular",
      "allocation": 0,
      "notes": "0% allocation to ensure deposits are invested"
    },
    {
      "id": "8c77accd-6762-43cc-89c1-447f723a3028",
      "name": "Idle Cash",
      "taxTreatment": "regular",
      "allocation": 0,
      "notes": "0% allocation to ensure idle cash is invested"
    },
    {
      "id": "176053db-d81b-4fb1-abd8-2b56309cf180",
      "name": "Ex-US Stock",
      "taxTreatment": "advantaged",
      "allocation": 17.5,
      "notes": "VXUS, FSGUX, ..."
    },
    {
      "id": "28735fca-a9ed-4015-8d11-3098670db53a",
      "name": "US Bond",
      "taxTreatment": "inefficient",
      "allocation": 30,
      "notes": "BND, FBIDX, ..."
    },
    {
      "id": "e9495523-3b04-4a64-a863-424c72761c97",
      "name": "US Stock",
      "taxTreatment": "regular",
      "allocation": 52.5,
      "notes": "VTI, FSTMX, ..."
    }
  ],
  "accounts": [
    {
      "id": "3644d01d-7136-4e8d-a0f7-30b27f404373",
      "name": "401 (k)",
      "taxTreatment": "deferred"
    },
    {
      "id": "163c6a0c-6d90-4611-bdfe-299e640f54b8",
      "name": "Roth IRA",
      "taxTreatment": "exempt"
    },
    {
      "id": "eb925f4e-960e-43b7-a05d-6cda4ffd281a",
      "name": "Brokerage Account",
      "taxTreatment": "regular"
    },
    {
      "id": "b37d454f-27d8-42d9-ad93-50fb9a68933e",
      "name": "HSA",
      "taxTreatment": "exempt"
    }
  ],
  "holdings": {
    "eb925f4e-960e-43b7-a05d-6cda4ffd281a": {
      "176053db-d81b-4fb1-abd8-2b56309cf180": {
        "balance": 2000,
        "lockAllocation": false,
        "notes": ""
      },
      "aab1a816-2f9f-4a67-bcfd-32449601af4a": {
        "balance": 250,
        "lockAllocation": false,
        "notes": ""
      },
      "8c77accd-6762-43cc-89c1-447f723a3028": {
        "balance": 1000,
        "lockAllocation": false,
        "notes": ""
      },
      "e9495523-3b04-4a64-a863-424c72761c97": {
        "balance": 900,
        "lockAllocation": true,
        "notes": "Locked to avoid selling, due to accrued capital gains"
      }
    },
    "3644d01d-7136-4e8d-a0f7-30b27f404373": {
      "28735fca-a9ed-4015-8d11-3098670db53a": {
        "balance": 4000,
        "lockAllocation": false,
        "notes": ""
      },
      "176053db-d81b-4fb1-abd8-2b56309cf180": {
        "balance": 4000,
        "lockAllocation": false,
        "notes": ""
      },
      "e9495523-3b04-4a64-a863-424c72761c97": {
        "balance": 4000,
        "lockAllocation": false,
        "notes": ""
      }
    },
    "b37d454f-27d8-42d9-ad93-50fb9a68933e": {
      "28735fca-a9ed-4015-8d11-3098670db53a": {
        "balance": 2000,
        "lockAllocation": false,
        "notes": ""
      }
    },
    "163c6a0c-6d90-4611-bdfe-299e640f54b8": {
      "e9495523-3b04-4a64-a863-424c72761c97": {
        "balance": 6000,
        "lockAllocation": false,
        "notes": ""
      }
    }
  }
};

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
          state = exampleState;
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
