import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IAccount, AccountTaxTreatmentT } from "../../store/types/accountTypes";
import * as AccountActions from "../../store/actions/accountActions";
import * as AccountHoldingActions from "../../store/actions/accountHoldingActions";

export interface IAccountProps {
  /* State */
  account: IAccount;

  /* Actions */
  updateName: typeof AccountActions.updateAccountName;
  updateTaxTreatment: typeof AccountActions.updateAccountTaxTreatment;
  remove: typeof AccountActions.removeAccount;
  updateHoldingBalance: typeof AccountHoldingActions.updateAccountHoldingBalance;
  updateHoldingNotes: typeof AccountHoldingActions.updateAccountHoldingNotes;
}

class Account extends React.Component<IAccountProps> {
  render() {
    let account = this.props.account;
    return (
      <div className="container-fluid form-group" style={{borderStyle: "solid dashed solid dashed", borderRadius: ".25rem .25rem .5rem .5rem", borderColor: "lightgrey"}}>
        <div className="row justify-content-center">
          <div className="col-md-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Asset Name" 
              value={account.name} 
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => { 
                  this.props.updateName(account.id, e.target.value);
                }
              }
            >
            </input>
          </div>
          <div className="col-md-2">
            <div className="input-group">
              <input 
                type="number" 
                className="form-control"
                id="allocation"
                min="0" 
                max="100" 
                placeholder="Allocation" 
                value={asset.allocation} 
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => { 
                    this.props.updateAllocation(asset.id, e.target.valueAsNumber);
                  }
                }
              >
              </input>
              <div className="input-group-append">
                <span className="input-group-text" id="allocation">%</span>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group">
              <select 
                className={("form-control" + (account.taxTreatment as string === "" ? "" : " is-invalid"))}
                value={account.taxTreatment}
                onChange={
                  (e: React.ChangeEvent<HTMLSelectElement>) => {
                    this.props.updateTaxTreatment(account.id, e.target.value as AccountTaxTreatmentT);
                  }
                }
              >
                <option disabled selected value="">-- Select a Tax Category: --</option>
                <option value="deferred">Tax Deferred</option>
                <option value="exempt">Tax Exempt</option>
                <option value="regular">Taxable</option>
              </select>
              <div className="input-group-append">
                <span className="input-group-text">
                  <Info
                    id={("tax-info-" + account.id)}
                    title="What to choose:"
                    detail={
                      <div>
                        <p>
                          <strong>Tax Deferred</strong>
                          <br/>
                          These accounts don't owe taxes until you withdraw, thereby limiting the negative aspects of dividends and other tax-inefficient forms of returns.
                          Examples include traditional 401(k), 403(b), and IRA accounts.
                        </p>
                        <p>
                          <strong>Tax Exempt</strong>
                          <br/>
                          Assets in these accounts are never taxed (if used correctly).
                          Examples include Roth accounts and HSAs.
                        </p>
                        <p>
                          <strong>Taxable</strong>
                          <br/>
                          These are run-of-the-mill brokerage and investment accounts.
                          They have no special tax advantages.
                        </p>
                      </div>
                    }>
                  </Info>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-1 text-center">
            <button 
              className="btn btn-outline-danger"
              onClick={ () => {this.props.remove(account.id)} }
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateName: (id: string, name: string) => dispatch(AccountActions.updateAccountName(id, name)),
  updateTaxTreatment: (id: string, taxTreatment: AccountTaxTreatmentT) => dispatch(AccountActions.updateAccountTaxTreatment(id, taxTreatment)),
  remove: (id: string) => dispatch(AccountActions.removeAccount(id)),
  updateHoldingBalance: (accountId: string, holdingId: string, balance: number) => dispatch(AccountHoldingActions.updateAccountHoldingBalance(accountId, holdingId, balance)),
  updateHoldingNotes: (accountId: string, holdingId: string, notes: string) => dispatch(AccountHoldingActions.updateAccountHoldingNotes(accountId, holdingId, notes))
});

export default connect(null, mapDispatchToProps)(Account);
