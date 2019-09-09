declare module "redux-undo" {
  export default function undoable<TState, TAction> (
    reducer: (state: TState, action: {}) => TState
  ): undoableReducer<TState>;

  export type undoableReducer<TState> = (state: undoableState<TState>, action: {}) => undoableState<TState>;

  export interface undoableState<TState> {
    past: TState[];
    present: TState;
    future: TState[];
  }

  export const ActionCreators: IActionCreators;

  export interface IActionCreators {
    undo: () => { type: string };
    redo: () => { type: string };
    jumpToFuture: (index: number) => { type: string, index: number };
    jumpToPast: (index: number) => { type: string, index: number };
    jump: (index: number) => { type: string, index: number };
    clearHistory: () => { type: string };
  }
}
