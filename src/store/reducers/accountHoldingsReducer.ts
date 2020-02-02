import * as AccountHoldingTypes from "../types/accountHoldingTypes";
import * as AccountTypes from "../types/accountTypes";
import * as AssetTypes from "../types/assetTypes";

export default function accountHoldingsReducer(
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
    case AccountHoldingTypes.TOGGLE_ACCOUNT_HOLDING_LOCK: {
      let stateWithSpecifiedHolding = initHoldingIfPlaceholder(state, action);
      return {
        ...stateWithSpecifiedHolding,
        [action.accountId] : {
          ...stateWithSpecifiedHolding[action.accountId],
          [action.assetId] : {
            ...stateWithSpecifiedHolding[action.accountId][action.assetId],
            lockAllocation: !stateWithSpecifiedHolding[action.accountId][action.assetId].lockAllocation
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
      // Create a new object with the removed account filtered out
      return Object.keys(state).reduce((newState, accountId) => {
        if (accountId !== action.id) {
            newState[accountId] = state[accountId];
        }
        return newState;
      }, {});
    case AssetTypes.REMOVE_ASSET: {
      let cleanedState = {};
      Object.keys(state).forEach((accountId: string) => {
        // Create a new object with the removed asset filtered out
        cleanedState[accountId] =
          Object.keys(state[accountId]).reduce((newAssetHoldingsState: AccountHoldingTypes.IAccountHoldings, assetId: string) => {
            if (assetId !== action.id) {
                newAssetHoldingsState[assetId] = state[accountId][assetId];
            }
            return newAssetHoldingsState;
          }, {});
      })
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
  if (!stateWithSpecifiedHolding[action.accountId]) {
    stateWithSpecifiedHolding[action.accountId] = {};
  }
  if (!stateWithSpecifiedHolding[action.accountId][action.assetId]) {
    stateWithSpecifiedHolding[action.accountId][action.assetId] = {
      balance: undefined,
      lockAllocation: false,
      notes: ""
    }
  }
  return stateWithSpecifiedHolding;
}
