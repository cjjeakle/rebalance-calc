declare module "redux-undo" {
  export function undoable<TState, TAction> (
    reducer: (state: TState, action: {}) => TState
  ): undoableReducer<TState>;

  export type undoableReducer<TState> = (state: undoableState<TState>, action: {}) => undoableState<TState>; 

  export interface undoableState<TState> {
    past: TState[];
    present: TState;
    future: TState[];
  }

  export class ActionCreators {
    public undo: () => { type: string };
    public redo: () => { type: string };
    public jumpToFuture: (index: number) => { type: string, index: number };
    public jumpToPast: (index: number) => { type: string, index: number };
    public jump: (index: number) => { type: string, index: number };
    public clearHistory: () => { type: string };
  }
}