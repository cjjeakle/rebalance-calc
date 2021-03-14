import * as React from "react";
import { FaGripVertical } from "react-icons/fa";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppStateT } from "../../store";
import { IAccount, AccountTaxTreatmentT } from "../../store/types/accountTypes";
import { AssetStateT, IAsset } from "../../store/types/assetTypes";
import { AccountHoldingsStateT } from "../../store/types/accountHoldingTypes";
import * as AccountActions from "../../store/actions/accountActions";
import * as AccountHoldingActions from "../../store/actions/accountHoldingActions";

import AccountHolding from "./AccountHolding";
import Info from "../Info";

import { roundToHundredths } from "../../lib/Utility";

export interface IAccountProps {
  /* State */
  alternateBackground: boolean;
  account: IAccount;
  assets: AssetStateT;
  holdings: AccountHoldingsStateT;

  /* Actions */
  updateName: typeof AccountActions.updateAccountName;
  updateTaxTreatment: typeof AccountActions.updateAccountTaxTreatment;
  remove: typeof AccountActions.removeAccount;
  toggleAccountHoldingLock: typeof AccountHoldingActions.toggleAccountHoldingLock;
  updateHoldingBalance: typeof AccountHoldingActions.updateAccountHoldingBalance;
  updateHoldingNotes: typeof AccountHoldingActions.updateAccountHoldingNotes;
}

class Account extends React.Component<IAccountProps> {
  render() {
    let account = this.props.account;
    
    let accountHoldings = this.props.holdings[account.id];
    if (!accountHoldings) {
      accountHoldings = {};
    }
    let holdings = this.props.assets.map((asset: IAsset) => {
      let assetHoldings = accountHoldings[asset.id];
      if (!assetHoldings) {
        assetHoldings = {
          balance: undefined,
          lockAllocation: false,
          notes: ""
        };
      }
      return (
        <div className="col-lg-4" key={(account.id + asset.id)}>
          <AccountHolding
            id = { account.id + asset.id }
            assetName = { asset.name }
            lockAllocation = { assetHoldings.lockAllocation }
            balance = { assetHoldings.balance }
            notes = { assetHoldings.notes }
            toggleAccountHoldingLock = { () => { this.props.toggleAccountHoldingLock(account.id, asset.id) } }
            updateBalance = { (balance: number) => { this.props.updateHoldingBalance(account.id, asset.id, balance) } }
            updateNotes = { (notes: string) => { this.props.updateHoldingNotes(account.id, asset.id, notes) } }
          />
        </div>
      );
    });

    return (
      <div style={{display:"flex"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginRight:".5rem"}}>
          <FaGripVertical />
        </div>
        <div className="container-fluid form-group" style={{/*override form group margins*/margin:".5rem 0 .5rem 0", backgroundColor:this.props.alternateBackground ? "WhiteSmoke" : "#EDF5F5"}}>
          <div className="row">
            <div className="col-lg-3" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <div>
                <div className="row">
                  <div className="col-lg-12">
                    <input
                        type="text" 
                        className="form-control" 
                        placeholder="Account Name" 
                        value={account.name} 
                        onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => { 
                            this.props.updateName(account.id, e.target.value);
                          }
                        }
                      >
                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-group">
                      <select 
                        className={("form-control" + (account.taxTreatment as string === undefined ? " is-invalid" : ""))}
                        value={account.taxTreatment}
                        onChange={
                          (e: React.ChangeEvent<HTMLSelectElement>) => {
                            this.props.updateTaxTreatment(account.id, e.target.value as AccountTaxTreatmentT);
                          }
                        }
                      >
                        <option disabled selected value="">-- Select a Tax Category: --</option>
                        <option value="regular">Taxable</option>
                        <option value="deferred">Tax deferred</option>
                        <option value="exempt">Tax exempt</option>
                      </select>
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <Info
                            id={("tax-info-" + account.id)}
                            title="What to choose:"
                            detail={
                              <div>
                                <p>
                                  <strong>Taxable</strong>
                                  <br/>
                                  These are run-of-the-mill brokerage and investment accounts.
                                  They have no special tax advantages.
                                </p>
                                <p>
                                  <strong>Tax deferred</strong>
                                  <br/>
                                  These accounts don't owe taxes until you withdraw, thereby limiting the negative aspects of dividends and other tax-inefficient forms of returns.
                                  Examples include traditional 401(k), 403(b), and IRA accounts.
                                </p>
                                <p>
                                  <strong>Tax exempt</strong>
                                  <br/>
                                  Assets in these accounts are never taxed (if used correctly).
                                  Examples include Roth accounts and HSAs.
                                </p>
                              </div>
                            }>
                          </Info>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center">
                    <em>Account Balance: $</em>{ roundToHundredths(Object.keys(accountHoldings).reduce((sum, assetId) => { return sum + accountHoldings[assetId].balance }, 0)) }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg">
              <div className="row">
              { holdings }
              </div>
            </div>
            <div className="col-lg-1 text-center" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <button 
                className="btn btn-outline-danger"
                onClick={ () => {this.props.remove(account.id)} }
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateT) => ({
  assets: state.present.assets,
  holdings: state.present.holdings
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateName: (id: string, name: string) => dispatch(AccountActions.updateAccountName(id, name)),
  updateTaxTreatment: (id: string, taxTreatment: AccountTaxTreatmentT) => dispatch(AccountActions.updateAccountTaxTreatment(id, taxTreatment)),
  remove: (id: string) => dispatch(AccountActions.removeAccount(id)),
  toggleAccountHoldingLock: (accountId: string, assetId: string) => dispatch(AccountHoldingActions.toggleAccountHoldingLock(accountId, assetId)),
  updateHoldingBalance: (accountId: string, assetId: string, balance: number) => dispatch(AccountHoldingActions.updateAccountHoldingBalance(accountId, assetId, balance)),
  updateHoldingNotes: (accountId: string, assetId: string, notes: string) => dispatch(AccountHoldingActions.updateAccountHoldingNotes(accountId, assetId, notes))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
