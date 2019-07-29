import {
    ADD_TAX_INEFFICIENT_ASSET,
    ADD_TAX_ADVANTAGED_ASSET,
    ADD_REGULAR_ASSET
} from "../actions/types";
import { Action } from "redux";

const initialState = {
}

export default function (state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}