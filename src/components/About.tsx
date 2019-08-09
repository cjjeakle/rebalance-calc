import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../store";
import * as UiActionCreators from "../store/actions/uiActiuons";

interface IAboutProps {
  /* State */
  howItWorksVisible: boolean;
  tipsAndTricksVisible: boolean;

  /* Actions */
  toggleHowItWorksVisible: typeof UiActionCreators.toggleHowItWorksVisible;
  toggleTipsAndTricksVisible: typeof UiActionCreators.toggleTipsAndTricksVisible;
}

class About extends React.Component<IAboutProps> {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Rebalance Calc</h1>
            <h4>A Portfolio Rebalancing Calculator</h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>
              This tool is meant to help with re-balancing investment assets, and with building a tax efficient portfolio (in the U.S.). 
              Periodically re-balancing keeps one's asset allocation (and exposure to risk) in a comfortable range, and works best when all investment accounts are treated as part of a single portfolio.
            </p>
            <p>
              See the bogleheads wiki for info on <a href="https://www.bogleheads.org/wiki/Principles_of_tax-efficient_fund_placement">tax efficiency</a>, 
              and for <a href="https://www.bogleheads.org/wiki/Video:Bogleheads%C2%AE_investment_philosophy">general investing suggestions</a>.
            </p>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center">
          <div className="col-auto">
            <button 
              onClick={this.props.toggleHowItWorksVisible} 
              className={"btn btn-outline-info btn-sm" + (this.props.howItWorksVisible ? " active" : "")} >
              How It Works ▼
            </button>
          </div>
          <div className="col-auto">
            <button onClick={this.props.toggleTipsAndTricksVisible} 
            className={"btn btn-outline-info btn-sm" + (this.props.tipsAndTricksVisible ? " active" : "")} >
              Tips and Tricks ▼
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.props.howItWorksVisible && <HowItWorks />}
            {this.props.tipsAndTricksVisible && <UsabilityHints />}
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

class HowItWorks extends React.Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-8">
          <br />
          <ol>
            <li>The total value of all accounts is determined, and is partitioned among the asset classes by percentage of the portfolio.</li>
            <li>'Tax inefficient assets' are assigned to tax deferred accounts, then to tax free accounts, and finally taxable accounts.</li>
            <li>'Foreign and tax-exempt assets' are assigned to taxable accounts, and any remaining allocation is postponed to the final step.</li>
            <li>'Regular assets' are assigned to tax free accounts, any remaining allocation is postponed to the final step, as well.</li>
            <li>Any remaining asset value is distributed among the remaining accounts with available balances.</li>
            <li>The result of this is displayed below in a table.</li>
          </ol>
        </div>
      </div>
    );
  }
}

class UsabilityHints extends React.Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-8">
          <br />
          <ol>
            <li>
              To save your work, just bookmark this page.
              <ul>
                <li>All your changes are automatically updated in the private hash or "fragment identifier" (#) portion of the URL.</li>
              </ul>
            </li>
            <li>None of your input leaves this page, all calculations are done in-browser.</li>
          </ol>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return state.uiState;
}

const dispatchToProps = {
  toggleHowItWorksVisible: UiActionCreators.toggleHowItWorksVisible,
  toggleTipsAndTricksVisible: UiActionCreators.toggleTipsAndTricksVisible
};

export default connect(mapStateToProps, dispatchToProps)(About);
