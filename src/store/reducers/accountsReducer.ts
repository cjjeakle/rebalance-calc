import {  } from "../actions/types";
import { Action } from "redux";

const initialState = {
}

export default function(state = initialState, action: Action) {
    switch (action.type) {
        default:
            return state;
    }
}