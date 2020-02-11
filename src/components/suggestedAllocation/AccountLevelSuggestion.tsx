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
  alternateBackground: boolean;
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
        assetHolding = { balance: 0, lockAllocation: false, notes: "" };
      }
      let assetSuggestion = suggestedHolding[asset.id];
      if (!assetSuggestion) {
        assetSuggestion = { balance: 0, lockAllocation: false, notes: ""}
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
      <div className="container-fluid form-group" style={{backgroundColor:this.props.alternateBackground ? "WhiteSmoke" : "" }}>
        <div className="row">
          <div className="col-lg-3" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div className="row">
              <div className="col" style={{textAlign: "center"}}>
                <b>{account.name}</b>
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
