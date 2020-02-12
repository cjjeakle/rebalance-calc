import * as ActionTypes from "../types/uiTypes";

export const initialState: ActionTypes.IUIState = {
  backwardCompatLinkVisible: false,
  aboutVisible: false,
  howItWorksVisible: false,
  tipsAndTricksVisible: false
}

export default function uiReducer(
  state: ActionTypes.IUIState = initialState,
  action: ActionTypes.UiActionTypes
): ActionTypes.IUIState {
  switch (action.type) {
    case ActionTypes.TOGGLE_ABOUT_VISIBLE:
      return {
        ...initialState,
        aboutVisible: !state.aboutVisible
      }
    case ActionTypes.TOGGLE_HOW_IT_WORKS_VISIBLE:
      return {
        ...initialState,
        howItWorksVisible: !state.howItWorksVisible
      };
    case ActionTypes.TOGGLE_TIPS_AND_TRICKS_VISIBLE:
      return {
        ...initialState,
        tipsAndTricksVisible: !state.tipsAndTricksVisible
      };
    default:
      return {
        ...state,
        backwardCompatLinkVisible: false
      };
  }
}
