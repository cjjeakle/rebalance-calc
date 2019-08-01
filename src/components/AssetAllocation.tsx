import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import AssetsReducer from "../store/reducers/assetsReducer"
import { IAsset } from "../store/types/assetTypes"

export type IAssetAllocationProps = ReturnType<typeof AssetsReducer>;

class AssetAllocation extends React.Component<IAssetAllocationProps, AppState> {
  constructor(props: IAssetAllocationProps) {
    super(props);
  }
  render() {
    return (
      <div>
        
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
