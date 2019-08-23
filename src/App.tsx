import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "./store";

import About from "./components/About";
import AssetAllocation from "./components/assets/AssetAllocation";
import AvailableAccounts from "./components/accounts/AccountsAvailable";
import SuggestedAllocation from "./components/SuggestedAllocation";

interface IAppProps {
}

class App extends React.Component<IAppProps> {
  render() {
    return (
      <div className="container-fluid">
        <About />
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
