import * as React from "react";
import { connect } from "react-redux";

import { AppStateT, CoreAppStateT } from "../../store";
import { IAccount, AccountStateT } from "../../store/types/accountTypes";
import { AccountHoldingsStateT } from "../../store/types/accountHoldingTypes";

import computeSuggestedHoldings from "../../lib/AssetAllocator";

import AccountLevelSuggestion from "./AccountLevelSuggestion";


export interface ISuggestedAllocationListProps {
  /* State */
  accounts: AccountStateT;
  holdings: AccountHoldingsStateT;
  curAppState: CoreAppStateT;
}

class SuggestedAllocationList extends React.Component<ISuggestedAllocationListProps> {
  render() {
    let suggestedHoldings: AccountHoldingsStateT = null;
    let error: JSX.Element = null;
    try {
      suggestedHoldings = computeSuggestedHoldings(this.props.curAppState);
    } catch (errorMsg) {
      error =
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="alert alert-danger alert-sm">
                  Error: {errorMsg}
              </div>
            </div>
          </div>
        </div>;
    }

    const listItems = error ? [] : this.props.accounts.map((account: IAccount, index: number) => {
      return (
        <div className="row" key={account.id}>
          <div className="col">
            <AccountLevelSuggestion
              holdings={this.props.holdings[account.id]}
              suggestedHoldings={suggestedHoldings[account.id]}
              alternateBackground={(index % 2) > 0}
              account={account}
            />
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h4>Suggested Allocation:</h4>
            <p>Use the <em>computed delta</em> to make trades that get you back in line with your desired asset allocation.</p>
          </div>
        </div>
        {error}
        {listItems}
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateT) => ({
  accounts: state.present.accounts,
  holdings: state.present.holdings,
  curAppState: state.present
});

export default connect(mapStateToProps, null)(SuggestedAllocationList);
