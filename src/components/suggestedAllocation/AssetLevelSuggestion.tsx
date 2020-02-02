import * as React from "react";

export interface IAccountHoldingProps {
  /* State */
  assetName: string;
  currentHolding: number;
  suggestedHolding: number;
}

export default class AccountHolding extends React.Component<IAccountHoldingProps> {
  render() {
    // Round any long floating point balances to hundredths.
    // Add epsilon (the smallest value JS floats can represent) to ensure we round up when exactly at the rounding boundary.
    let delta: number = Math.round(((this.props.suggestedHolding - this.props.currentHolding) + Number.EPSILON) * 100) / 100;
    return (
      <div className="container-fluid form-group" style={{borderStyle: "solid dashed solid dashed", borderRadius: ".25rem .25rem .5rem .5rem", borderColor: "lightgrey"}}>
        <div className="row">
          <div className="col" style={{textAlign: "center"}}>
            <b>{this.props.assetName}&nbsp;</b>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <em>Current Holding</em> : ${this.props.currentHolding}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <em>Suggested Holding </em> : ${this.props.suggestedHolding}
          </div>
        </div>
        <div className="row">
          <div className="col">
            -----------------
          </div>
        </div>
        <div className="row">
          <div className="col">
            <em>Computed Delta</em> :&nbsp;
            <span style={{backgroundColor:
                (Math.sign(delta) === 1 ?
                  "green" :
                  (Math.sign(delta) === -1 ? "red" : ""))
            }}>${delta}</span>
          </div>
        </div>
      </div>
    );
  }
}
