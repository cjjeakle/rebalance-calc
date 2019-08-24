declare module 'redux-undo' {
  export default function undoable<T> (reducer: (state: T, action: {}) => T, config: IUndoableConfig): undoableReducer<T>;

  export type undoableReducer<T> = (state: undoableState<T>, action: {}) => undoableState<T>; 

  export interface undoableState<T> {
    past: T[];
    present: T;
    future: T[];
  }

  export interface IUndoableConfig {
    filter: (state: any) => boolean;
  }

  export function distinctState(): (state: any) => boolean;

  export class ActionCreators {
    undo: () => { type: string };
    redo: () => { type: string };
    jumpToFuture: (index: number) => { type: string, index: number };
    jumpToPast: (index: number) => { type: string, index: number };
    jump: (index: number) => { type: string, index: number };
    clearHistory: () => { type: string };
  }
}