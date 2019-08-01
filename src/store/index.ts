import { createStore, combineReducers, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import uiReducer from "./reducers/uiReducer"
import assetsReducer from "./reducers/assetsReducer";
import accountsReducer from "./reducers/accountsReducer";

const rootReducer = combineReducers({
  uiState: uiReducer,
  assets: assetsReducer,
  accounts: accountsReducer
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
