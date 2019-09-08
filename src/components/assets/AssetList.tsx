import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as Bootstrap from "react-bootstrap";

import { ListState } from "../../store/types/listTypes";
import * as ListActions from "../../store/actions/listActions";
import { IAsset, AssetListNames } from "../../store/types/assetTypes";
import { Info } from "../Info";
import AssetListElement from "./AssetListElement";

export interface IAssetTypeListProps {
  /* State */
  title: string;
  info: string;
  listName: AssetListNames;
  elements: ListState<IAsset>;

  /* Actions */
  addElement: typeof ListActions.addElement;
}

class AssetList extends React.Component<IAssetTypeListProps> {
  render() {
    const listItems = this.props.elements.map((element: IAsset, index: number) => {
      return (
        <div className="row" key={index}>
          <div className="col">
            <AssetListElement listName={this.props.listName} index={index} asset={element} />
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid mb-1 border-left border-right border-primary rounded">
        <div className="row">
          <div className="col">
            <h5>{this.props.title} <Info id={this.props.listName} title={this.props.title} detail={this.props.info}></Info></h5>
          </div>
        </div>
        {listItems}
        <div className="row justify-content-center">
          <div className="col-auto">
            <Bootstrap.Button 
              variant="outline-primary" 
              className="btn-sm" 
              onClick={()=>{this.props.addElement(this.props.listName, emptyAsset)}}
            >
              +
            </Bootstrap.Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addElement: (listName: AssetListNames, payload: IAsset) => dispatch(ListActions.addElement(listName, payload))
});

export default connect(null, mapDispatchToProps)(AssetList);
