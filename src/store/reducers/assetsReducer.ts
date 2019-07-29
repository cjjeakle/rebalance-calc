import * as ActionTypes from "../actions/types";

const initialState: ActionTypes.IAssetsState = {
    assetsInefficient: [],
    assetsAdvantaged: [],
    assetsRegular: []
}

export default function assetsReducer(
    state = initialState,
    action: ActionTypes.AssetActionTypes
): ActionTypes.IAssetsState {
    switch (action.type) {
        case ActionTypes.ADD_TAX_INEFFICIENT_ASSET:
            return {
                ...state,
                assetsInefficient: [...state.assetsInefficient, action.payload]
            }
        case ActionTypes.ADD_TAX_ADVANTAGED_ASSET:
            return {
                ...state,
                assetsAdvantaged: [...state.assetsAdvantaged, action.payload]
            }
        case: ActionTypes.ADD_REGULAR_ASSET:
            return {
                ...state,
                assetsRegular: [...state.assetsRegular, action.payload]
            }
        default:
            return state;
    }
}
