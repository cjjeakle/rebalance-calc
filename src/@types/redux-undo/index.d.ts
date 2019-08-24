declare module 'redux-undo' {
  export default function undoable<T, A> (reducer: (state: T, action: {}) => T, config: IUndoableConfig): undoableReducer<T>;

  export type undoableReducer<T> = (state: undoableState<T>, action: {}) => undoableState<T>; 

  export interface undoableState<T> {
    past: T[];
    present: T;
    future: T[];
  }

  export interface IUndoableConfig<A> {
    filter: (action: A) => boolean;
  }

  export function distinctState(): (state: any) => boolean;

  export class ActionCreators {
    public undo: () => { type: string };
    public redo: () => { type: string };
    public jumpToFuture: (index: number) => { type: string, index: number };
    public jumpToPast: (index: number) => { type: string, index: number };
    public jump: (index: number) => { type: string, index: number };
    public clearHistory: () => { type: string };
  }
}