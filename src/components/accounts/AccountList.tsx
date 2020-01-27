import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as Bootstrap from "react-bootstrap";

import { AppState } from "../../store";
import { IAccount, AccountStateT } from "../../store/types/accountTypes";
import * as AccountActions from "../../store/actions/accountActions";
import Account from "./Account";

export interface IAccountListProps {
  /* State */
  accounts: AccountStateT;

  /* Actions */
  addAccount: typeof AccountActions.addAccount;
  removeAccount: typeof AccountActions.removeAccount;
}

class AccountList extends React.Component<IAccountListProps> {
  render() {
    const listItems = this.props.accounts.map((account: IAccount) => {
      return (
        <div className="row" key={account.id}>
          <div className="col">
            <Account
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
            <h4>Current Account Balances:</h4>
            <div className="alert alert-info alert-sm">For help classifying accounts, see the first bullet in the list <a href="https://www.bogleheads.org/wiki/Principles_of_tax-efficient_fund_placement#General_strategy">here</a>.</div>
          </div>
        </div>
        {listItems}
        <div className="row justify-content-center">
          <div className="col-auto">
            <Bootstrap.Button 
              variant="outline-primary" 
              className="btn-sm" 
              onClick={ this.props.addAccount }
            >
              +
            </Bootstrap.Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  accounts: state.present.accounts
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addAccount: () => dispatch(AccountActions.addAccount())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
