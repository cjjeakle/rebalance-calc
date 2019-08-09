import * as React from "react";
import { connect } from "react-redux";
import * as ListActions from "../store/actions/listActons";
import { IAsset, AssetListNames } from "../store/types/assetTypes";

export interface IAssetListElementProps {
  /* State */
  listName: AssetListNames;
  index: number;
  asset: IAsset;

  /* Actions */
  updateAsset: typeof ListActions.updateElement;
}

export class AssetListElement extends React.Component<IAssetListElementProps> {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <input 
              type="text" 
              placeholder="Asset Class" 
              value={this.props.asset.name} 
              onChange={
                (e: React.ChangeEvent) => { 
                  this.props.updateAsset(
                    this.props.listName, 
                    this.props.index, 
                    { 
                      ...this.props.asset, 
                      name: e.target.nodeValue 
                    }
                  );
                }
              }>
            </input>
            <input 
              type="number" 
              min="0" 
              max="100" 
              placeholder="% of Portfolio" 
              value={this.props.asset.allocation} 
              onChange={
                (e: React.ChangeEvent) => { 
                  this.props.updateAsset(
                    this.props.listName, 
                    this.props.index, 
                    { 
                      ...this.props.asset, 
                      allocation: Number.parseFloat(e.target.nodeValue) 
                    }
                  );
                }
              }>
            </input>
            <input 
              type="text" 
              placeholder="Notes" 
              value={this.props.asset.notes}
              onChange={
                (e: React.ChangeEvent) => { 
                  this.props.updateAsset(
                    this.props.listName, 
                    this.props.index, 
                    { 
                      ...this.props.asset, 
                      notes: e.target.nodeValue 
                    }
                  );
                }
              }>
            </input>
          </div>
        </div>
      </div>
    );
  }
}

const dispatchToProps = {
  updateAsset: ListActions.updateElement
}

export default connect(()=>{}, dispatchToProps)(AssetListElement);
