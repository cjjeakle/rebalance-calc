import * as React from "react";

import ControlPanel from "./components/ControlPanel";
import MoreInfo from "./components/MoreInfo";
import AssetList from "./components/assets/AssetList";
import AccountList from "./components/accounts/AccountList";
import SuggestedAllocation from "./components/SuggestedAllocation";

class App extends React.Component<{}> {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1>Rebalance Calc</h1>
            <div className="lead">A Portfolio Rebalancing Calculator</div>
          </div>
        </div>
        <ControlPanel />
        <MoreInfo />
        <AssetList />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <hr />
          </div>
        </div>
        <AccountList />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <hr />
          </div>
        </div>
        <SuggestedAllocation />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
