declare module "redux-undo" {
  /* Actions */

  export interface IActionCreators {
    undo: () => { type: string };
    redo: () => { type: string };
    jumpToFuture: (index: number) => { type: string, index: number };
    jumpToPast: (index: number) => { type: string, index: number };
    jump: (index: number) => { type: string, index: number };
    clearHistory: () => { type: string };
  }

  export const ActionCreators: IActionCreators;

  /* State Management */

  export interface undoableState<TState> {
    past: TState[];
    present: TState;
    future: TState[];
  }

  export type undoableReducer<TState> = (state: undoableState<TState>, action: {}) => undoableState<TState>;

  export default function undoable<TState, TAction> (
    reducer: (state: TState, action: TAction) => TState
  ): undoableReducer<TState>;
}
