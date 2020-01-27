import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

interface IComponentProps {
}

class App extends React.Component<IComponentProps> {
  render() {
    return (
      <div className="row">
        <div className="col">
          <h4>Suggested Trades:</h4>
          <span>(to reach the suggested allocation)</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IComponentProps => ({
});

export default connect(
  mapStateToProps,
  {}
)(App);
