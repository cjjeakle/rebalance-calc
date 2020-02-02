import * as React from "react";

export interface IAccountHoldingProps {
  /* State */
  assetName: string;
  balance: number;
  notes: string

  /* Actions */
  updateBalance: (balance: number) => void;
  updateNotes: (notes: string) => void;
}

export default class AccountHolding extends React.Component<IAccountHoldingProps> {
  render() {
    return (
      <div className="container-fluid form-group" style={{borderStyle: "solid dashed solid dashed", borderRadius: ".25rem .25rem .5rem .5rem", borderColor: "lightgrey"}}>
        <div className="row">
          <div className="col">
            <b>{this.props.assetName}&nbsp;</b>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="balance">$</span>
              </div>
              <input 
                type="number" 
                className="form-control"
                id="balance"
                min="0"
                placeholder="Balance" 
                value={this.props.balance} 
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => { 
                    this.props.updateBalance(e.target.valueAsNumber);
                  }
                }
              >
              </input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="text" 
              className="form-control" 
              placeholder="Notes" 
              value={this.props.notes}
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => { 
                  this.props.updateNotes(e.target.value);
                }
              }
            >
            </input>
          </div>
        </div>
      </div>
    );
  }
}
