import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../store";
import * as UiActionCreators from "../store/actions/uiActions";

interface IMoreInfoProps {
  /* State */
  aboutVisible: boolean;
  howItWorksVisible: boolean;
  tipsAndTricksVisible: boolean;

  /* Actions */
  toggleAboutVisible: typeof UiActionCreators.toggleAboutVisible;
  toggleHowItWorksVisible: typeof UiActionCreators.toggleHowItWorksVisible;
  toggleTipsAndTricksVisible: typeof UiActionCreators.toggleTipsAndTricksVisible;
}

class MoreInfo extends React.Component<IMoreInfoProps> {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-auto">
            <button 
              onClick={this.props.toggleAboutVisible} 
              className={"btn btn-outline-info btn-sm" + (this.props.aboutVisible ? " active" : "")} >
              About ▼
            </button>
          </div>
          <div className="col-lg-auto">
            <button 
              onClick={this.props.toggleHowItWorksVisible} 
              className={"btn btn-outline-info btn-sm" + (this.props.howItWorksVisible ? " active" : "")} >
              How It Works ▼
            </button>
          </div>
          <div className="col-lg-auto">
            <button onClick={this.props.toggleTipsAndTricksVisible} 
            className={"btn btn-outline-info btn-sm" + (this.props.tipsAndTricksVisible ? " active" : "")} >
              Tips and Tricks ▼
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.props.aboutVisible && <AboutTheApp />}
            {this.props.howItWorksVisible && <HowItWorks />}
            {this.props.tipsAndTricksVisible && <UsabilityHints />}
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

class AboutTheApp extends React.Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <br />
          <div className="row">
            <div className="col">
              <p>
                This tool can help you <a href="https://www.bogleheads.org/wiki/Rebalancing">re-balance</a> investments and build a tax efficient portfolio.
              </p>
              <p>
                Periodically re-balancing is useful, it:
                <ol>
                  <li>Keeps your exposure to risk in a comfortable range</li>
                  <li>Automatically helps you capture gains from investments that are "up" (relative to your other assets)</li>
                  <li>Ensures you move funds into assets that have more upside/are currently down</li>
                </ol>
              </p>
              <p>
                Re-balancing works best when all investment accounts are treated as a single portfolio.
              </p>
              <p>
                See the bogleheads wiki for info on <a href="https://www.bogleheads.org/wiki/Principles_of_tax-efficient_fund_placement">tax efficiency</a>, 
                and for <a href="https://www.bogleheads.org/wiki/Video:Bogleheads%C2%AE_investment_philosophy">general investing suggestions</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class HowItWorks extends React.Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <br />
          <ol>
            <li>The total value of all accounts is determined</li>
            <li>Your total account value is partitioned among the asset classes by percentage of the portfolio</li>
            <li>'Tax inefficient' assets are assigned to tax deferred accounts, then to tax free accounts, and finally taxable accounts</li>
            <li>'Tax advantaged' assets are assigned to taxable accounts, and any remaining allocation is postponed to the final step</li>
            <li>Assets with 'no special tax treatment' are first assigned to tax free accounts, and any remaining allocation is postponed to the final step</li>
            <li>Any remaining asset value is distributed among the remaining account balances, this is done in the order of the lists below</li>
            <li>The result of this procedure is displayed below in a table</li>
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
        <div className="col-lg-10">
          <br />
          <ul>
            <li>
              To save your work, just bookmark this page
              <ul>
                <li>All your changes are automatically updated in the private hash or "fragment identifier" (#) portion of the URL</li>
              </ul>
            </li>
            <li>
              To model a deposit or idle cash: use an "asset" with a 0% allocation.
              Any account balance tagged as that cash asset type be assigned to a different, desired asset!
            </li>
            <li>None of your input leaves this page, all calculations are done in-browser</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => state.present.uiState;

const dispatchToProps = {
  toggleAboutVisible: UiActionCreators.toggleAboutVisible,
  toggleHowItWorksVisible: UiActionCreators.toggleHowItWorksVisible,
  toggleTipsAndTricksVisible: UiActionCreators.toggleTipsAndTricksVisible
};

export default connect(mapStateToProps, dispatchToProps)(MoreInfo);
