import { createStore, applyMiddleware, Middleware } from "redux";

const initialState = {};

const middleware: Middleware[] = [];

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
)