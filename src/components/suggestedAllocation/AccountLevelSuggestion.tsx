import * as React from "react";
import { connect } from "react-redux";

import { AppStateT } from "../../store";
import { IAccount } from "../../store/types/accountTypes";
import { AssetStateT, IAsset } from "../../store/types/assetTypes";
import { IAccountHoldings } from "../../store/types/accountHoldingTypes";

import AccountHolding from "./AssetLevelSuggestion";

export interface IAccountLevelSuggestionProps {
  /* State */
  alternateBackground: boolean;
  account: IAccount;
  holdings: IAccountHoldings;
  suggestedHoldings: IAccountHoldings;
  assets: AssetStateT;
}

class AccountLevelSuggestion extends React.Component<IAccountLevelSuggestionProps> {
  render() {
    let account = this.props.account;

    let curHolding = this.props.holdings;
    if (!curHolding) {
      curHolding = {};
    }
    let suggestedHolding = this.props.suggestedHoldings;
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
      <div className="container-fluid form-group" style={{backgroundColor:this.props.alternateBackground ? "WhiteSmoke" : "#EDF5F5" }}>
        <div className="row">
          <div className="col-lg-3" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div className="row">
              <div className="col-lg-12" style={{textAlign: "center"}}>
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

const mapStateToProps = (state: AppStateT) => ({
  assets: state.present.assets
});

export default connect(mapStateToProps, null)(AccountLevelSuggestion);
