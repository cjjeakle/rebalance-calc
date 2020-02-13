import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as Bootstrap from "react-bootstrap";
import * as DnD from "react-beautiful-dnd";

import { AppStateT } from "../../store";
import { IAsset, AssetStateT } from "../../store/types/assetTypes";
import * as AssetActions from "../../store/actions/assetActions";
import Asset from "./Asset";

export interface IAssetTypeListProps {
  /* State */
  assets: AssetStateT;

  /* Actions */
  addAsset: typeof AssetActions.addAsset;
  moveAsset: typeof AssetActions.moveAsset;
}

class AssetList extends React.Component<IAssetTypeListProps> {
  render() {
    const onDragEnd = (result: DnD.DropResult, provided: DnD.ResponderProvided): void => {
      if (!result.destination) {
        return;
      }
    
      let oldIndex = result.source.index;
      let newIndex = result.destination.index;
      this.props.moveAsset(oldIndex, newIndex);
    };

    const listItems = this.props.assets.map((asset: IAsset, index: number) => {
      return (
        <DnD.Draggable key={asset.id} draggableId={asset.id} index={index}>
        {(provided: DnD.DraggableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="row" key={asset.id}>
              <div className="col">
                <Asset
                  asset={asset}
                />
              </div>
            </div>
          </div>
        )}
        </DnD.Draggable>
      );
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h4>Desired Asset Allocation:</h4>
            <em>Total Allocation: </em> { this.props.assets.reduce((sum, asset) => { return sum + asset.allocation; }, 0) }%
            <div className="alert alert-info alert-sm">For help classifying assets, <a href="https://www.bogleheads.org/wiki/Principles_of_tax-efficient_fund_placement#Step_1:_Categorize_your_portfolio.27s_tax_efficiency">see this chart</a>.</div>
          </div>
        </div>
        <DnD.DragDropContext onDragEnd={onDragEnd}>
          <DnD.Droppable droppableId="droppable">
            {(provided: DnD.DroppableProvided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listItems}
                {provided.placeholder}
              </div>
            )}
          </DnD.Droppable>
        </DnD.DragDropContext>
        <div className="row justify-content-center">
          <div className="col-lg-auto text-center">
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

const mapStateToProps = (state: AppStateT) => ({
  assets: state.present.assets,
  suggestedHoldings: state.present
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addAsset: () => dispatch(AssetActions.addAsset()),
  moveAsset: (oldIndex: number, newIndex: number) => dispatch(AssetActions.moveAsset(oldIndex, newIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetList);
