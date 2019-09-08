import * as React from "react";

import About from "./components/About";
import ControlPanel from "./components/ControlPanel";
import AssetAllocation from "./components/assets/AssetAllocation";
import AvailableAccounts from "./components/accounts/AccountsAvailable";
import SuggestedAllocation from "./components/SuggestedAllocation";

class App extends React.Component<{}> {
  render() {
    return (
      <div className="container-fluid">
        <About />
        <ControlPanel />
        <AssetAllocation />
        <AvailableAccounts />
        <SuggestedAllocation />
      </div>
    );
  }
}

export default App;
