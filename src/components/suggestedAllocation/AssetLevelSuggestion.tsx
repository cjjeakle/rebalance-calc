import * as React from "react";

export interface IAccountHoldingProps {
  /* State */
  assetName: string;
  currentHolding: number;
  suggestedHolding: number;
}

export default class AccountHolding extends React.Component<IAccountHoldingProps> {
  render() {
    return (
      <div className="container-fluid form-group" style={{borderStyle: "solid dashed solid dashed", borderRadius: ".25rem .25rem .5rem .5rem", borderColor: "lightgrey"}}>
        <div className="row">
          <div className="col" style={{textAlign: "center"}}>
            <b>{this.props.assetName}&nbsp;</b>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <em>Current Holding</em> : {this.props.currentHolding}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <em>Suggested Holding </em> : {this.props.suggestedHolding}
          </div>
        </div>
        <div className="row">
          <div className="col">
            -----------------
          </div>
        </div>
        <div className="row">
          <div className="col">
            <em>Computed Delta </em> : {this.props.suggestedHolding - this.props.currentHolding}
          </div>
        </div>
      </div>
    );
  }
}
