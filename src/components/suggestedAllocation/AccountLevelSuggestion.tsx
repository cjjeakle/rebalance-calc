import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { IAccount, AccountTaxTreatmentT } from "../../store/types/accountTypes";
import { AssetStateT, IAsset } from "../../store/types/assetTypes";
import { AccountHoldingsStateT } from "../../store/types/accountHoldingTypes";

import AccountHolding from "./AssetLevelSuggestion";

import computeSuggestedHoldings from "../../lib/AssetAllocator";

export interface IAccountLevelSuggestionProps {
  /* State */
  account: IAccount;
  assets: AssetStateT;
  holdings: AccountHoldingsStateT;
  suggestedHoldings: AccountHoldingsStateT;
}

class AccountLevelSuggestion extends React.Component<IAccountLevelSuggestionProps> {
  render() {
    let account = this.props.account;

    let curHolding = this.props.holdings[account.id];
    if (!curHolding) {
      curHolding = {};
    }
    let suggestedHolding = this.props.suggestedHoldings[account.id];
    if (!suggestedHolding) {
      suggestedHolding = {};
    }
    let assetLevelSuggestions = this.props.assets.map((asset: IAsset) => {
      let assetHolding = curHolding[asset.id];
      if (!assetHolding) {
        assetHolding = { balance: 0, notes: "" };
      }
      let assetSuggestion = suggestedHolding[asset.id];
      if (!assetSuggestion) {
        assetSuggestion = { balance: 0, notes: ""}
      }
      return (
        <div className="col-lg-4" key={(account.id + asset.id)}>
          <AccountHolding
            assetName = { asset.name }
            currentHolding = { assetHolding.balance }
            suggestedHolding = { assetSuggestion.balance }
          />
        </div>
      );
    });

    return (
      <div className="container-fluid form-group" style={{borderStyle: "solid dashed solid dashed", borderRadius: ".25rem .25rem .5rem .5rem", borderColor: "lightgrey"}}>
        <div className="row">
          <div className="col-lg-3" style={{borderRight: "dotted 1px lightgrey"}}>
            <div className="row">
              <div className="col" style={{textAlign: "center"}}>
                <b>{account.name}</b>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <span>{this.props.account.taxTreatment}</span>
              </div>
            </div>
          </div>
          <div className="col-lg">
            <div className="row">
            { assetLevelSuggestions }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  assets: state.present.assets,
  holdings: state.present.holdings,
  suggestedHoldings: computeSuggestedHoldings(state)
});

export default connect(mapStateToProps, null)(AccountLevelSuggestion);
