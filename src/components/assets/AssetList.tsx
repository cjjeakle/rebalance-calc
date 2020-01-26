import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as Bootstrap from "react-bootstrap";

import { IAsset, AssetStateT } from "../../store/types/assetTypes";
import * as AssetActions from "../../store/actions/assetActions";
import Asset from "./Asset";
import { AppState } from "../../store";

export interface IAssetTypeListProps {
  /* State */
  assets: AssetStateT;

  /* Actions */
  addAsset: typeof AssetActions.addAsset;
  moveAsset: typeof AssetActions.moveAsset;
}

class AssetList extends React.Component<IAssetTypeListProps> {
  render() {
    const listItems = this.props.assets.map((asset: IAsset) => {
      return (
        <div className="row" key={asset.id}>
          <div className="col">
            <Asset
              asset={asset}
            />
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid mb-1 border-left border-right border-primary rounded">
        <div className="row">
          <div className="col">
            <h4>Desired Asset Allocation:</h4>
            <div className="alert alert-info alert-sm">For help classifying assets, <a href="https://www.bogleheads.org/wiki/Principles_of_tax-efficient_fund_placement#Step_1:_Categorize_your_portfolio.27s_tax_efficiency">see this chart</a>.</div>
          </div>
        </div>
        {listItems}
        <div className="row justify-content-center">
          <div className="col-auto">
            <Bootstrap.Button 
              variant="outline-primary" 
              className="btn-sm" 
              onClick={ this.props.addAsset }
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
  assets: state.present.assets
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addAsset: () => dispatch(AssetActions.addAsset()),
  moveAsset: (id: string, movedBeforeId: string) => dispatch(AssetActions.moveAsset(id, movedBeforeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetList);
