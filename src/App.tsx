import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import rootReducer from 

let store = createStore(() => [], null, applyMiddleware());

class App extends React.Component {
  render() {
    return (
      <>
    );
  }
}

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("main")
);