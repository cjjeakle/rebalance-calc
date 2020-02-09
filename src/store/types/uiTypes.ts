import { Action } from "redux";

/* State: */
export interface IUIState {
  backwardCompatLinkVisible: boolean;
  aboutVisible: boolean;
  howItWorksVisible: boolean;
  tipsAndTricksVisible: boolean;
}

/* Actions: */
export const TOGGLE_ABOUT_VISIBLE = "TOGGLE_ABOUT_VISIBLE";
export const TOGGLE_HOW_IT_WORKS_VISIBLE = "TOGGLE_HOW_IT_WORKS_VISIBLE";
export const TOGGLE_TIPS_AND_TRICKS_VISIBLE = "TOGGLE_TIPS_AND_TRICKS_VISIBLE";

/* Action Interfaces: */
export interface IToggleAboutVisible extends Action {
  type: typeof TOGGLE_ABOUT_VISIBLE;
}
export interface IToggleHowItWorksVisible extends Action {
  type: typeof TOGGLE_HOW_IT_WORKS_VISIBLE;
}
export interface IToggleTipsAndTricksVisible extends Action {
  type: typeof TOGGLE_TIPS_AND_TRICKS_VISIBLE;
}

/* Supported Actions: */
export type UiActionTypes = IToggleAboutVisible | IToggleHowItWorksVisible | IToggleTipsAndTricksVisible;
