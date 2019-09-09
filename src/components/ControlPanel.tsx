import * as React from "react";
import { connect } from "react-redux";
import * as ReduxUndo from "redux-undo";
import { AppState } from "../store";

interface IControlPanelProps {
  /* State */
  undoAvailable: boolean;
  redoAvailable: boolean;

  /* Actions */
  undo: () => void;
  redo: () => void;
}

class ControlPanel extends React.Component<IControlPanelProps> {
  render() {
    return (
      <div className="container-fluid">
        <hr />
        <div className="row justify-content-center">
          <div className="col-auto">
            <button 
              onClick={this.props.undo} 
              className={"btn btn-outline-info btn-sm"} 
              disabled={!this.props.undoAvailable}
            >
              Undo
            </button>
          </div>
          <div className="col-auto">
            <button 
              onClick={this.props.redo} 
              className={"btn btn-outline-info btn-sm"} 
              disabled={!this.props.redoAvailable} 
            >
              Redo
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    undoAvailable: state.past.length > 0,
    redoAvailable: state.future.length > 0
  }
}

const dispatchToProps = {
  undo: ReduxUndo.ActionCreators.undo,
  redo: ReduxUndo.ActionCreators.redo
};

export default connect(mapStateToProps, dispatchToProps)(ControlPanel);
