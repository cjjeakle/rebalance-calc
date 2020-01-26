import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { IAsset, TaxTreatmentT } from "../../store/types/assetTypes";
import * as AssetActions from "../../store/actions/assetActions";

import { Info } from "../Info";

export interface IAssetListElementProps {
  /* State */
  asset: IAsset;

  /* Element-Level Actions*/
  updateName: typeof AssetActions.updateAssetName;
  updateClass: typeof AssetActions.updateAssetTaxEfficiency;
  updateAllocation: typeof AssetActions.updateAssetAllocation;
  updateNotes: typeof AssetActions.updateAssetNotes;
  removeAsset: typeof AssetActions.removeAsset;
}

class AssetListElement extends React.Component<IAssetListElementProps> {
  render() {
    let asset = this.props.asset;
    return (
      <div className="container-fluid form-group" style={{borderStyle: "solid dashed solid dashed", borderRadius: ".25rem .25rem .5rem .5rem", borderColor: "lightgrey"}}>
        <div className="row justify-content-center">
          <div className="col-md-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Asset Name" 
              value={asset.name} 
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => { 
                  this.props.updateName(asset.id, e.target.value);
                }
              }
            >
            </input>
          </div>
          <div className="col-md-2">
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
                    this.props.updateAllocation(asset.id, e.target.valueAsNumber);
                  }
                }
              >
              </input>
              <div className="input-group-append">
                <span className="input-group-text" id="allocation">%</span>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group">
              <select 
                className={("form-control" + (asset.taxTreatment as string === "" ? "" : " is-invalid"))}
                value={asset.taxTreatment}
                onChange={
                  (e: React.ChangeEvent<HTMLSelectElement>) => {
                    this.props.updateClass(asset.id, e.target.value as TaxTreatmentT);
                  }
                }
              >
                <option disabled selected value="">-- Select a Tax Category: --</option>
                <option value="inefficient">Tax inefficient</option>
                <option value="advantaged">Tax efficient</option>
                <option value="regular">No special tax treatment</option>
              </select>
              <div className="input-group-append">
                <span className="input-group-text" id="">
                  <Info
                    id={("tax-info-" + asset.id)}
                    title="What to choose:"
                    detail={
                      <div>
                        <p>
                          <strong>Tax inefficient</strong>
                          <br/>
                          These assets primarily earn via non-qualified dividends.
                          Examples include most bonds and REITs.
                        </p>
                        <p>
                          <strong>Tax advantaged</strong>
                          <br/>
                          These assets are eligible for a tax credit on foreign tax, or those which are entirely tax-exempt. 
                          Examples include ex-us stock funds and municipal bonds.
                        </p>
                        <p>
                          <strong>No special tax treatment</strong>
                          <br/>
                          These are assets with no special tax considerations, they earn a return by growing in value.
                          Examples include individual stocks and typical passive index funds.
                          Such assets typically issue qualified dividends, relatively small non-qualified dividends, or no dividend at all.
                          <br />
                          <em>
                            Pro tip: For optimal results, place assets in this category with the most growth potential toward the top of the asset list.
                            That ensures such assets are more likely to be allocated to a tax-advantaged account.
                          </em>
                        </p>
                      </div>
                    }>
                  </Info>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md">
            <input
              type="text" 
              className="form-control" 
              placeholder="Notes" 
              value={asset.notes}
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => { 
                  this.props.updateNotes(asset.id, e.target.value);
                }
              }
            >
            </input>
          </div>
          <div className="col-md-1 text-center">
            <button 
              className="btn btn-outline-danger"
              onClick={ () => {this.props.removeAsset(asset.id)} }
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({assets: state.present.assets });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateName: (id: string, name: string) => dispatch(AssetActions.updateAssetName(id, name)),
  updateClass: (id: string, className: TaxTreatmentT) => dispatch(AssetActions.updateAssetTaxEfficiency(id, className)),
  updateAllocation: (id: string, allocation: number) => dispatch(AssetActions.updateAssetAllocation(id, allocation)),
  updateNotes: (id: string, notes: string) => dispatch(AssetActions.updateAssetNotes(id, notes)),
  removeAsset: (id: string) => dispatch(AssetActions.removeAsset(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetListElement);
