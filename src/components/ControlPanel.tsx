import * as React from "react";
import { connect } from "react-redux";
import * as ReduxUndo from "redux-undo";
import { AppState } from "../store";

interface IControlPanelProps {
  /* State */
  showBackwardCompatLink: boolean;
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
        <div className="row">
          <div className="col">
            {
              this.props.showBackwardCompatLink &&
              <div className="alert alert-warning alert-sm">
                Based on the URL bar, it appears you're trying to load data from a previous version of this site.
                Click <a href={"../backwardCompat/v1/" + window.location.hash}>this link</a> to open your saved data in backward compatibility mode.
              </div>
            }
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-auto">
            <button 
              onClick={this.props.undo} 
              className={"btn btn-outline-info btn-sm"} 
              disabled={!this.props.undoAvailable}
            >
              Undo
            </button>
          </div>
          <div className="col-lg-auto">
            <button 
              onClick={this.props.redo} 
              className={"btn btn-outline-info btn-sm"} 
              disabled={!this.props.redoAvailable} 
            >
              Redo
            </button>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    showBackwardCompatLink: state.present.uiState.backwardCompatLinkVisible,
    undoAvailable: state.past.length > 0,
    redoAvailable: state.future.length > 0
  }
}

const dispatchToProps = {
  undo: ReduxUndo.ActionCreators.undo,
  redo: ReduxUndo.ActionCreators.redo
};

export default connect(mapStateToProps, dispatchToProps)(ControlPanel);
