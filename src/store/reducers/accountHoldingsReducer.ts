import { combineReducers } from "redux";

import * as AccountHoldingTypes from "../types/accountHoldingTypes";
import * as AccountTypes from "../types/accountTypes";
import * as AssetTypes from "../types/assetTypes";

function accountHoldingsReducer(
  state: AccountHoldingTypes.AccountHoldingsStateT = {},
  action: AccountHoldingTypes.ActionTypes | AccountTypes.IRemoveAccount | AssetTypes.IRemoveAsset
): AccountHoldingTypes.AccountHoldingsStateT {
  switch (action.type) {
    case AccountHoldingTypes.UPDATE_ACCOUNT_HOLDING_BALANCE: {
      let stateWithSpecifiedHolding = initHoldingIfPlaceholder(state, action);
      return {
        ...stateWithSpecifiedHolding,
        [action.accountId] : {
          ...stateWithSpecifiedHolding[action.accountId],
          [action.assetId] : {
            ...stateWithSpecifiedHolding[action.accountId][action.assetId],
            balance: action.balance
          }
        }
      }
    }
    case AccountHoldingTypes.UPDATE_ACCOUNT_HOLDING_NOTES: {
      let stateWithSpecifiedHolding = initHoldingIfPlaceholder(state, action);
      return {
        ...stateWithSpecifiedHolding,
        [action.accountId] : {
          ...stateWithSpecifiedHolding[action.accountId],
          [action.assetId] : {
            ...stateWithSpecifiedHolding[action.accountId][action.assetId],
            notes: action.notes
          }
        }
      }
    }
    case AccountTypes.REMOVE_ACCOUNT:
      return Object.keys(state).reduce((accountHoldings, accountId) => {
        if (accountId !== action.id) {
            accountHoldings[accountId] = state[accountId];
        }
        return accountHoldings;
      }, {});
    case AssetTypes.REMOVE_ASSET: {
      let cleanedState = {};
      for(let accountId in Object.keys(state)) {
        // Create a new object with the removed asset filtered out
        cleanedState[accountId] =
          Object.keys(state[accountId]).reduce((accountAssetHoldings, assetId) => {
            if (assetId !== action.id) {
                accountAssetHoldings[assetId] = state[accountId][assetId];
            }
            return accountAssetHoldings;
          }, {});
      }
      return cleanedState;
    }
    default:
      return state;
  }
}

// If data was entered into a placeholder, this method will create someplace to store the data
function initHoldingIfPlaceholder(
  state: AccountHoldingTypes.AccountHoldingsStateT = {},
  action: AccountHoldingTypes.ActionTypes
): AccountHoldingTypes.AccountHoldingsStateT {
  let stateWithSpecifiedHolding = { ...state };
  if (state[action.accountId] === undefined) {
    stateWithSpecifiedHolding[action.accountId] = {};
  }
  if (state[action.accountId][action.assetId] === undefined) {
    stateWithSpecifiedHolding[action.accountId][action.assetId] = {
      balance: 0,
      notes: ""
    }
  }
  return stateWithSpecifiedHolding;
}

export default combineReducers(accountHoldingsReducer);