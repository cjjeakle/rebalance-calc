import * as React from "react";
import { connect } from "react-redux";
import * as ReduxUndo from "redux-undo";
import { AppStateT } from "../store";
import * as PersistenceActions from "../store/actions/persistenceActions";

interface IControlPanelProps {
  /* State */
  showBackwardCompatLink: boolean;
  showExampleDataPrompt: boolean;
  undoAvailable: boolean;
  redoAvailable: boolean;

  /* Actions */
  undo: typeof ReduxUndo.ActionCreators.undo;
  redo: typeof ReduxUndo.ActionCreators.redo;
  loadExampleData: typeof PersistenceActions.loadExampleData;
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
                Click <a href={"/backwardCompat/v1/index.html" + window.location.hash}>this link</a> to open your saved data in backward compatibility mode.
              </div>
            }
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            {
              this.props.showExampleDataPrompt &&
              <div className="alert alert-success alert-sm">
                  Welcome! Try loading some example data to see how the app works:
                  <br />
                  <br />
                  <button
                    onClick={this.props.loadExampleData} 
                    className={"btn btn-success btn-sm"} 
                  >
                    Load example data
                  </button>
                  <br />
                  <br />
                  The tips and tricks button (in the menu below) can be helpful, too!
              </div>
            }
          </div>
        </div>
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
        <br />
      </div>
    );
  }
}

function mapStateToProps(state: AppStateT) {
  return {
    showBackwardCompatLink: state.present.uiState.backwardCompatLinkVisible,
    showExampleDataPrompt: state.present.accounts.length == 0 && state.present.assets.length == 0,
    undoAvailable: state.past.length > 0,
    redoAvailable: state.future.length > 0
  }
}

const dispatchToProps = {
  undo: ReduxUndo.ActionCreators.undo,
  redo: ReduxUndo.ActionCreators.redo,
  loadExampleData: PersistenceActions.loadExampleData
};

export default connect(mapStateToProps, dispatchToProps)(ControlPanel);
