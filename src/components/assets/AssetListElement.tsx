import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "../../store";
import * as ListActions from "../../store/actions/listActions";
import * as AssetActions from "../../store/actions/assetActions";
import { AssetListNames, IAssetsState } from "../../store/types/assetTypes";

export interface IAssetListElementProps {
  /* State */
  listId: AssetListNames;
  assetId: string;
  assets: IAssetsState;

  /* Container Actions */
  moveInList: typeof ListActions.moveElement;
  removeFromList: () => void;

  /* Element-Level Actions*/
  updateName: typeof AssetActions.updateAssetName;
  updateAllocation: typeof AssetActions.updateAssetAllocation;
  updateNotes: typeof AssetActions.updateAssetNotes;
  toggleDetails: typeof AssetActions.toggleAssetDetails;
}

class AssetListElement extends React.Component<IAssetListElementProps> {
  render() {
    const asset = this.props.assets[this.props.assetId];
    return (
      <div className="container-fluid form-group" style={{borderStyle: "solid dashed solid dashed", borderRadius: ".25rem .25rem .5rem .5rem", borderColor: "lightblue"}}>
        <div className="row justify-content-center">
          <div className="col-xs-6 col-md-6 px-1">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Asset Class Name" 
              value={asset.name} 
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => { 
                  this.props.updateName(this.props.assetId, e.target.value);
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
                value={asset.allocation} 
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => { 
                    this.props.updateAllocation(this.props.assetId, e.target.valueAsNumber);
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
              onClick={() => this.props.toggleDetails(this.props.assetId)}
            >
              {asset.showDetails ? "▲" : "▼"}
            </button> 
          </div>
        </div>
        {asset.showDetails &&
          <div className="row justify-content-center mt-2 mb-2">
            <div className="col-auto">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Notes" 
                value={asset.notes}
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => { 
                    this.props.updateNotes(this.props.assetId, e.target.value);
                  }
                }
              >
              </input>
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-outline-danger"
                onClick={() => this.props.removeFromList()}
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

const mapStateToProps = (state: AppState) => ({assets: state.present.assets.allAssets });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateName: (id: string, name: string) => dispatch(AssetActions.updateAssetName(id, name)),
  updateAllocation: (id: string, allocation: number) => dispatch(AssetActions.updateAssetAllocation(id, allocation)),
  updateNotes: (id: string, notes: string) => dispatch(AssetActions.updateAssetNotes(id, notes)),
  toggleDetails: (id: string) => dispatch(AssetActions.toggleAssetDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetListElement);
