import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as Bootstrap from "react-bootstrap";
import uuid from "uuid";

import * as ListActions from "../../store/actions/listActions";
import { ListStateT } from "../../store/types/listTypes";
import { AssetListNames } from "../../store/types/assetTypes";
import { Info } from "../Info";
import AssetListElement from "./AssetListElement";

export interface IAssetTypeListProps {
  /* State */
  title: string;
  info: string;
  listId: AssetListNames;
  elements: ListStateT;

  /* Actions */
  addElement: (listId: AssetListNames) => void;
  moveElement: typeof ListActions.moveElement;
  removeElement: typeof ListActions.removeElement;
}

class AssetList extends React.Component<IAssetTypeListProps> {
  render() {
    const listItems = this.props.elements.map((assetId: string) => {
      return (
        <div className="row" key={assetId}>
          <div className="col">
            <AssetListElement 
              listId={this.props.listId} 
              assetId={assetId} 
              moveInList={this.props.moveElement} 
              removeFromList={ () => this.props.removeElement(this.props.listId, assetId) }
            />
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid mb-1 border-left border-right border-primary rounded">
        <div className="row">
          <div className="col">
            <h5>{this.props.title} <Info id={this.props.listId} title={this.props.title} detail={this.props.info}></Info></h5>
          </div>
        </div>
        {listItems}
        <div className="row justify-content-center">
          <div className="col-auto">
            <Bootstrap.Button 
              variant="outline-primary" 
              className="btn-sm" 
              onClick={() => { this.props.addElement(this.props.listId) }}
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
  addElement: (listId: AssetListNames) => dispatch(ListActions.addElement(listId, uuid.v4())),
  moveElement: (listId: AssetListNames, elementId: string, newIndex: number) => dispatch(ListActions.moveElement(listId, elementId, newIndex)),
  removeElement: (listId: AssetListNames, elementId: string) => dispatch(ListActions.removeElement(listId, elementId))
});

export default connect(null, mapDispatchToProps)(AssetList);
