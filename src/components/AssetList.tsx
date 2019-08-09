import * as React from "react";
import { connect } from "react-redux";
import { ListState } from "../store/types/listTypes";
import * as listActions from "../store/actions/listActons";
import { IAsset } from "../store/types/assetTypes";

export interface IAssetTypeListProps {
  /* State */
  title: string;
  info: string;
  elements: ListState<IAsset>;

  /* Actions */
  addData: typeof listActions.addElement;
  moveAccount: typeof listActions.moveAccount;
  removeAccount: typeof listActions.removeAccount;
}

export class AssetList extends React.Component<IAssetTypeListProps> {
  constructor(props: IAssetTypeListProps) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            
          </div>
        </div>
      </div>
    );
  }
}

const dispatchToProps = {
  addData: listActions.addElement,
  moveAccount: listActions.moveAccount,
  removeAccount: listActions.removeAccount
}

export default connect(()=>{}, dispatchToProps)(AssetList);
