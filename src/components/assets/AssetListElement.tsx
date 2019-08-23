import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import * as ListActions from "../../store/actions/listActions";
import { IAsset, AssetListNames } from "../../store/types/assetTypes";

export interface IAssetListElementProps {
  /* State */
  listName: AssetListNames;
  index: number;
  asset: IAsset;

  /* Actions */
  updateAsset: typeof ListActions.updateElement;
  removeAsset: typeof ListActions.removeElement;
}

class AssetListElement extends React.Component<IAssetListElementProps> {
  render() {
    return (
      <div className="container-fluid">
        <div className="form-row">
          <div className="form-group col-6">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Asset Class Name" 
              value={this.props.asset.name} 
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => { 
                  this.props.updateAsset(
                    this.props.listName, 
                    this.props.index, 
                    { 
                      ...this.props.asset, 
                      name: e.target.value 
                    }
                  );
                }
              }>
            </input>
          </div>
          <div className="form-group col-4">
            <div className="input-group">
              <input 
                type="number" 
                className="form-control"
                id="allocation"
                min="0" 
                max="100" 
                placeholder="Allocation" 
                value={this.props.asset.allocation} 
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => { 
                    this.props.updateAsset(
                      this.props.listName, 
                      this.props.index, 
                      { 
                        ...this.props.asset, 
                        allocation: e.target.valueAsNumber
                      }
                    );
                  }
                }>
              </input>
              <div className="input-group-append">
                <span className="input-group-text" id="allocation">%</span>
              </div>
            </div>
          </div>
          <div className="form-group col-auto">
            . . . 
          </div>
        </div>
        <div className="form-row justify-content-center">
          <div className="form-group col-8">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Notes" 
              value={this.props.asset.notes}
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => { 
                  this.props.updateAsset(
                    this.props.listName, 
                    this.props.index, 
                    { 
                      ...this.props.asset, 
                      notes: e.target.value 
                    }
                  );
                }
              }>
            </input>
          </div>
          <div className="form-group col-auto">
            <button 
              className="btn btn-outline-danger"
              onClick={() => this.props.removeAsset(this.props.listName, this.props.index)}>
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateAsset: (listName: AssetListNames, index: number, payload: IAsset) => dispatch(ListActions.updateElement(listName, index, payload)),
  removeAsset: (listName: AssetListNames, index: number) => dispatch(ListActions.removeElement(listName, index)),
});

export default connect(null, mapDispatchToProps)(AssetListElement);
