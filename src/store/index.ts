import { createStore, combineReducers, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import undoable from "redux-undo";

import uiReducer from "./reducers/uiReducer"
import assetsReducer from "./reducers/assetsReducer";
import accountsReducer from "./reducers/accountsReducer";
import accountHoldingsReducer from "./reducers/accountHoldingsReducer";

import { loadFromUrlReducer, persistToUrlReducer} from "./reducers/persistenceReducer";

const coreAppReducer = combineReducers({
    uiState: uiReducer,
    assets: assetsReducer,
    accounts: accountsReducer,
    holdings: accountHoldingsReducer
});
export type CoreAppStateT = ReturnType<typeof coreAppReducer>;

const undoableAppReducer = undoable(loadFromUrlReducer(coreAppReducer));
export type UndoableAppStateT = ReturnType<typeof undoableAppReducer>;

const completeAppReducer = persistToUrlReducer(undoableAppReducer);
export type CompleteAppStateT = ReturnType<typeof completeAppReducer>;

export default function configureStore() {
  const middleware: Middleware[] = [];
  const middlewareEnhancer = applyMiddleware(...middleware);

  const store = createStore(
    completeAppReducer,
    composeWithDevTools(middlewareEnhancer)
  );

  return store;
}
