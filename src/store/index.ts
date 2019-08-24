import { createStore, combineReducers, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import undoable, { distinctState }  from "redux-undo";

import { ListActionFilter } from "./types/listTypes";

import uiReducer from "./reducers/uiReducer"
import assetsReducer from "./reducers/assetsReducer";
import accountsReducer from "./reducers/accountsReducer";

const listReducer = combineReducers({
  assets: assetsReducer,
  accounts: accountsReducer
});

const undoableListReducer = undoable(listReducer, {
  filter: ListActionFilter
});

const rootReducer = combineReducers({
  uiState: uiReducer,
  lists: undoableListReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middleware: Middleware[] = [];
  const middlewareEnhancer = applyMiddleware(...middleware);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middlewareEnhancer)
  );

  return store;
}
