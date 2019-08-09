import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import AssetsReducer from "../store/reducers/assetsReducer"

export type IAssetAllocationProps = ReturnType<typeof AssetsReducer>;

class AssetAllocation extends React.Component<IAssetAllocationProps, AppState> {
  constructor(props: IAssetAllocationProps) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            For help classifying assets, <a href="https://www.bogleheads.org/wiki/Principles_of_tax-efficient_fund_placement#Step_1:_Categorize_your_portfolio.27s_tax_efficiency">see this chart</a>.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IAssetAllocationProps => {
  return state.assets;
};

export default connect(
  mapStateToProps,
  {}
)(AssetAllocation);
