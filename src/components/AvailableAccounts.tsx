import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import AccountsReducer from "../store/reducers/accountsReducer"

export type IAvailableAccountsProps = ReturnType<typeof AccountsReducer>;

class AssetAllocation extends React.Component<IAvailableAccountsProps, AppState> {
  constructor(props: IAvailableAccountsProps) {
    super(props);
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IAvailableAccountsProps => {
  return state.accounts;
};

export default connect(
  mapStateToProps,
  {}
)(AssetAllocation);
