import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store";
import App from "./App";

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDom.render(<Root />, document.getElementById("app"));
