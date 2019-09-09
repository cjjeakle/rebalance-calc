import * as React from "react";

import ControlPanel from "./components/ControlPanel";
import MoreInfo from "./components/MoreInfo";
import AssetAllocation from "./components/assets/AssetAllocation";
import AvailableAccounts from "./components/accounts/AccountsAvailable";
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
        <AssetAllocation />
        <AvailableAccounts />
        <SuggestedAllocation />
      </div>
    );
  }
}

export default App;
