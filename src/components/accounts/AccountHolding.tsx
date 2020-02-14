import * as React from "react";

import Info from "../Info";

export interface IAccountHoldingProps {
  /* State */
  id: string;
  assetName: string;
  lockAllocation: boolean;
  balance: number;
  notes: string;

  /* Actions */
  toggleAccountHoldingLock: () => void;
  updateBalance: (balance: number) => void;
  updateNotes: (notes: string) => void;
}

export default class AccountHolding extends React.Component<IAccountHoldingProps> {
  render() {
    return (
      <div className="container-fluid form-group">
        <div className="row">
          <div className="col">
            <b>{this.props.assetName}&nbsp;</b>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <input
              id={this.props.id}
              type="checkbox"
              checked={ this.props.lockAllocation }
              onChange={ this.props.toggleAccountHoldingLock }
            ></input>
            <label htmlFor={this.props.id}>&nbsp;Lock Allocation</label>
          </div>
          <div className="col-2 pull-right" style={{textAlign:"right"}}>
            <Info
              id={("lock-allocation-info-" + this.props.id)}
              title="Lock Allocation"
              detail={
                <div>
                  <p>
                    Use this checkbox to lock this particular allocation in this particular account, 
                    even if that overrides the allocation calculator. 
                  </p>
                  <p>
                    It's best to use this flag only to avoid selling legacy holdings with fairly high unrealized gains (to defer capital gains taxes).
                  </p>
                </div>
              }>
            </Info>
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
