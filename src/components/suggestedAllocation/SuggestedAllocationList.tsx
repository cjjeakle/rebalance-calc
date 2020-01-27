import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { IAccount, AccountStateT } from "../../store/types/accountTypes";
import AccountLevelSuggestion from "./AccountLevelSuggestion";

export interface ISuggestedAllocationListProps {
  /* State */
  accounts: AccountStateT;
}

class SuggestedAllocationList extends React.Component<ISuggestedAllocationListProps> {
  render() {
    const listItems = this.props.accounts.map((account: IAccount) => {
      return (
        <div className="row" key={account.id}>
          <div className="col">
            <AccountLevelSuggestion
              account={account}
            />
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid mb-1 border-left border-right border-primary rounded">
        <div className="row">
          <div className="col">
            <h4>Suggested Allocation:</h4>
          </div>
        </div>
        {listItems}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  accounts: state.present.accounts
});

export default connect(mapStateToProps, null)(SuggestedAllocationList);
