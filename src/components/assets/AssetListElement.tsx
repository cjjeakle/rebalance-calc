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
      <div className="container-fluid form-group" style={{borderStyle: "solid dashed solid dashed", borderRadius: ".25rem .25rem .5rem .5rem", borderColor: "lightblue"}}>
        <div className="row justify-content-center">
          <div className="col-xs-6 col-md-6 px-1">
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
              }
            >
            </input>
          </div>
          <div className="col-xs-4 col-md-4 px-1">
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
                }
              >
              </input>
              <div className="input-group-append">
                <span className="input-group-text" id="allocation">%</span>
              </div>
            </div>
          </div>
          <div className="col-xs-2 col-md-2 px-1" style={{textAlign: "center"}}>
            <button 
              className="btn btn-outline-primary"
              onClick={() => this.props.updateAsset(
                this.props.listName, 
                this.props.index, 
                { 
                  ...this.props.asset, 
                  showDetails: !this.props.asset.showDetails
                }
              )}
            >
              {this.props.asset.showDetails ? "▲" : "▼"}
            </button> 
          </div>
        </div>
        {this.props.asset.showDetails &&
          <div className="row justify-content-center mt-2 mb-2">
            <div className="col-auto">
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
                }
              >
              </input>
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-outline-danger"
                onClick={() => this.props.removeAsset(this.props.listName, this.props.index)}
              >
                X
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateAsset: (listName: AssetListNames, index: number, payload: IAsset) => dispatch(ListActions.updateElement(listName, index, payload)),
  removeAsset: (listName: AssetListNames, index: number) => dispatch(ListActions.removeElement(listName, index)),
});

export default connect(null, mapDispatchToProps)(AssetListElement);
