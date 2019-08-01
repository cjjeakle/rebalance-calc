import * as ActionTypes from "../types/uiTypes";

const initialState: ActionTypes.IUIState = {
  howItWorksVisible: false,
  tipsAndTricksVisible: false
}

export default function uiReducer(
  state: ActionTypes.IUIState = initialState,
  action: ActionTypes.UiActionTypes
): ActionTypes.IUIState {
  switch (action.type) {
    case ActionTypes.TOGGLE_HOW_IT_WORKS_VISIBLE:
      return {
        ...state,
        howItWorksVisible: !state.howItWorksVisible,
        tipsAndTricksVisible: false
      };
    case ActionTypes.TOGGLE_TIPS_AND_TRICKS_VISIBLE:
      return {
        ...state,
        howItWorksVisible: false,
        tipsAndTricksVisible: !state.tipsAndTricksVisible
      };
    default:
      return state;
  }
}
