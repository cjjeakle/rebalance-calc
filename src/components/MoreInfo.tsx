import * as React from "react";
import { connect } from "react-redux";
import { AppStateT } from "../store";
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
          <div className="col-auto">
            <button 
              onClick={this.props.toggleAboutVisible} 
              className={"btn btn-outline-info btn-sm" + (this.props.aboutVisible ? " active" : "")} >
              About ▼
            </button>
          </div>
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
        <div className="col-lg-8">
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
                  <li>Automatically helps you capture gains from investments that are "up"/outperforming (relative to your other assets)</li>
                  <li>Ensures you stay the course by putting contributions and gains to work according to your asset allocation</li>
                </ol>
              </p>
              <p>
                Re-balancing works best when all investment accounts are treated as part of a single portfolio.
              </p>
              <p>
                See the Bogleheads wiki for info on <a href="https://www.bogleheads.org/wiki/Principles_of_tax-efficient_fund_placement">tax efficiency</a>, 
                and for <a href="https://www.bogleheads.org/wiki/Video:Bogleheads%C2%AE_investment_philosophy">general investing suggestions</a>.
              </p>
              <p>
                License:<br/>
                This tool is free to use, and is made available under <a href="https://github.com/cjjeakle/rebalance-calc#license">the MIT license</a>.
                Please note there is no warranty. The tool's author is not your financial advisor, the calculator's output is a suggestion, and this tool does not provide personalized financial advice.
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
        <div className="col-lg-8">
          <br />
          <ol>
            <li>The total value of all accounts is determined</li>
            <li>Your total account value is partitioned among the asset classes by percentage</li>
            <li>"Tax inefficient" assets are assigned to tax deferred accounts, then to tax free accounts, and finally taxable accounts</li>
            <li>"Tax advantaged" assets are assigned to taxable accounts, then any remaining allocation is postponed to the final step</li>
            <li>Assets with "no special tax treatment" are first assigned to tax free accounts, then any remaining allocation is postponed to the final step</li>
            <li>Any remaining asset value is distributed among the remaining account balances, this is done in the same order as the lists below</li>
            <li>The result of this procedure is displayed in a table</li>
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
        <div className="col-lg-8">
          <br />
          <ul>
            <li>
              You can re-arrange assets, re-arrange accounts, and use the "Lock Allocation" flag to tweak the calculator's suggestions
              <ul>
                <li>A good order for assets: lowest percentage -> highest percentage</li>
                <li>A good order for accounts: highest balance -> lowest balance</li>
                <li>That ordering helps ensure the fewest number of accounts end up needing trades (by virtue of the calculator's order of operations)</li>
              </ul>
            </li>
            <li>
              To save your work, just bookmark this page
              <ul>
                <li>All your changes are automatically updated in the private hash or "fragment identifier" (#) portion of the URL</li>
              </ul>
            </li>
            <li>
              Want to account for deposits or idle cash?
              <ul>
                <li>Use an "asset" with a 0% allocation</li>
                <li>Any account with funds in a 0% allocation asset will have them assigned to a different, desired asset</li>
              </ul>
            </li>
            <li>
              Want to account for withdrawals?
              <ul>
                <li>Use an "asset" with a 0% allocation, and "fund" that asset with a negative balance in the account you plan to withdraw from</li>
                <li>The calculator will see the 0% allocation target, and will sell appropriate assets to bring that negative balance to 0</li>
              </ul>
            </li>
            <li>It's easy to start a new session with a clean state, just click the title at the top of this page</li>
            <li>None of your input leaves this page, all calculations are done in-browser</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateT) => state.present.uiState;

const dispatchToProps = {
  toggleAboutVisible: UiActionCreators.toggleAboutVisible,
  toggleHowItWorksVisible: UiActionCreators.toggleHowItWorksVisible,
  toggleTipsAndTricksVisible: UiActionCreators.toggleTipsAndTricksVisible
};

export default connect(mapStateToProps, dispatchToProps)(MoreInfo);
