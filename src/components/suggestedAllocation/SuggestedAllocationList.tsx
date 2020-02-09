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
            <div style={{textAlign:"center"}}>=-=</div>
            <AccountLevelSuggestion
              account={account}
            />
            <div style={{textAlign:"center"}}>-=-</div>
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
        {listItems}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  accounts: state.present.accounts
});

export default connect(mapStateToProps, null)(SuggestedAllocationList);
