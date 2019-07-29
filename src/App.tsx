import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import { AppState } from "./store";

import AssetAllocation from "./components/AssetAllocation";
import AvailableAccounts from "./components/AvailableAccounts";
import SuggestedAllocation from "./components/SuggestedAllocation";

interface IAppProps {

}

class App extends React.Component<IAppProps> {
  render() {
    return (
      <AssetAllocation />
      <AvailableAccounts />
      <SuggestedAllocation />
    );
  }
}

const mapStateToProps = (state: AppState): IAppProps => ({
});

export default connect(
  mapStateToProps,
  {}
)(App);
