import * as React from "react";
import { connect } from "react-redux";
import { ListState } from "../store/types/listTypes"

export interface IListProps<T> {
  title: string;
  info: string;
  elements: ListState<T>;
}

export class List<T> extends React.Component<IListProps<T>> {
  constructor(props: IListProps) {
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}
