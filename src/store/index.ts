import { createStore, combineReducers, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import undoable from "redux-undo";

import persistenceReducer from "./reducers/persistenceReducer";

import uiReducer from "./reducers/uiReducer"
import assetsReducer from "./reducers/assetsReducer";
import accountsReducer from "./reducers/accountsReducer";
import accountHoldingsReducer from "./reducers/accountHoldingsReducer";

const rootReducer = combineReducers({
    uiState: uiReducer,
    assets: assetsReducer,
    accounts: accountsReducer,
    holdings: accountHoldingsReducer
});

export type CoreAppStateT = ReturnType<typeof rootReducer>;

const undoableRootReducer = undoable(persistenceReducer(rootReducer));

export type AppState = ReturnType<typeof undoableRootReducer>;

export default function configureStore() {
  const middleware: Middleware[] = [];
  const middlewareEnhancer = applyMiddleware(...middleware);

  const store = createStore(
    undoableRootReducer,
    composeWithDevTools(middlewareEnhancer)
  );

  return store;
}
