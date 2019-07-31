import React from "react";
import ReactDom, { render } from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store";
import App from "./App";

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDom.render(<Root />, document.getElementById("app"));
