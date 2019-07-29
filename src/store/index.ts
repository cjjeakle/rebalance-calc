import { createStore, combineReducers, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import assetsReducer from "./reducers/assetsReducer";
import accountsReducer from "./reducers/accountsReducer";

const rootReducer = combineReducers({
    assetsReducer,
    accountsReducer
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
