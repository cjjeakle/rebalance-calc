import * as React from "react";

import { roundToHundredths } from "../../lib/Utility";

export interface IAccountHoldingProps {
  /* State */
  assetName: string;
  currentHolding: number;
  suggestedHolding: number;
}

export default class AccountHolding extends React.Component<IAccountHoldingProps> {
  render() {
    let delta: number = roundToHundredths(this.props.suggestedHolding - this.props.currentHolding);
    let numberColor: string = (Math.sign(delta) === 1 ? "lightgreen" : (Math.sign(delta) === -1 ? "red" : ""))
    let borderColor: string = (Math.sign(delta) === 1 ? "green" : (Math.sign(delta) === -1 ? "tomato" : "lightgrey"))
    return (
      <div className="container-fluid mb-1" style={{borderStyle:"solid", borderWidth:"1px", borderRadius:"5px", borderColor:borderColor}}>
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
            <span style={{backgroundColor:numberColor}}>${delta}</span>
          </div>
        </div>
      </div>
    );
  }
}
