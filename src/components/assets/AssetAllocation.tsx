import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import AssetsReducer from "../../store/reducers/assetsReducer";
import AssetList from "./AssetList";

export type IAssetAllocationProps = ReturnType<typeof AssetsReducer>;

class AssetAllocation extends React.Component<IAssetAllocationProps, AppState> {
  constructor(props: IAssetAllocationProps) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col">
            <h4>Desired Asset Allocation:</h4>
            <div className="alert alert-info alert-sm">For help classifying assets, <a href="https://www.bogleheads.org/wiki/Principles_of_tax-efficient_fund_placement#Step_1:_Categorize_your_portfolio.27s_tax_efficiency">see this chart</a>.</div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl">
            <AssetList 
              title="Tax Inefficient Assets" 
              info="Assets which primarily earn via non-qualified dividends. Examples include non-municipal bonds and REITs." 
              listId="assetsInefficient" 
              elements={this.props.inefficient} 
            />
          </div>
          <div className="col-xl">
            <AssetList 
              title="Tax Advantaged Assets" 
              info="Assets eligible for a US tax credit on foreign tax, or those which are entirely tax-exempt. Examples include ex-us stock funds and municipal bonds." 
              listId="assetsAdvantaged" 
              elements={this.props.advantaged} 
            />
          </div>
          <div className="col-xl">
            <AssetList 
              title="All Other Assets" 
              info="Assets with no special tax considerations go here. Examples include US stock index funds and individual stocks that issue qualified dividends or no dividends. For optimal results, place the assets you expect to increase in price most toward the top of this list." 
              listId="assetsRegular" 
              elements={this.props.regular} 
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IAssetAllocationProps => {
  return state.present.assets;
};

export default connect(
  mapStateToProps,
  {}
)(AssetAllocation);
