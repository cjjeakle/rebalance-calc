import * as React from "react";

export interface IAccountHoldingProps {
  /* State */
  assetName: string;
  currentHolding: number;
  suggestedHolding: number;
}

function roundToHundredths(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export default class AccountHolding extends React.Component<IAccountHoldingProps> {
  render() {
    // Round any long floating point balances to hundredths.
    // Add epsilon (the smallest value JS floats can represent) to ensure we round up when exactly at the rounding boundary.
    let delta: number = roundToHundredths(this.props.suggestedHolding - this.props.currentHolding);
    return (
      <div className="container-fluid mb-1" style={{borderStyle:"solid", borderWidth:"1px", borderRadius:"5px", borderColor:"lightgrey"}}>
        <div className="row">
          <div className="col" style={{textAlign: "center"}}>
            <b>{this.props.assetName}&nbsp;</b>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <em>Current Holding</em> : ${ roundToHundredths(this.props.currentHolding)}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <em>Suggested Holding </em> : ${ roundToHundredths(this.props.suggestedHolding) }
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
                  "lightgreen" :
                  (Math.sign(delta) === -1 ? "tomato" : ""))
            }}>${delta}</span>
          </div>
        </div>
      </div>
    );
  }
}
