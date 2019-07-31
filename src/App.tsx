import * as React from "react";
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
      <div>
        <AssetAllocation />
        <AvailableAccounts />
        <SuggestedAllocation />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IAppProps => ({
});

export default connect(
  mapStateToProps,
  {}
)(App);
