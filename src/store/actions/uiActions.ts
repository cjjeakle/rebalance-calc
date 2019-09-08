import * as ActionTypes from "../types/uiTypes";

export function toggleAboutVisible() {
  return {
    type: ActionTypes.TOGGLE_ABOUT_VISIBLE
  }
}

export function toggleHowItWorksVisible() {
  return {
    type: ActionTypes.TOGGLE_HOW_IT_WORKS_VISIBLE
  }
}

export function toggleTipsAndTricksVisible() {
  return {
    type: ActionTypes.TOGGLE_TIPS_AND_TRICKS_VISIBLE
  }
}
