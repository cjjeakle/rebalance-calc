import * as React from "react";
import * as bootstrap from "react-bootstrap";

export interface IInfoProps {
  id: string;
  title: string;
  detail: string;
}

export class Info extends React.Component<IInfoProps> {
  render() {
    return (
      <bootstrap.OverlayTrigger 
        trigger="hover"
        overlay={
        <bootstrap.Popover id={this.props.id}>
          <bootstrap.Popover.Title>{this.props.title}</bootstrap.Popover.Title>
          <bootstrap.Popover.Content>{this.props.detail}</bootstrap.Popover.Content>
        </bootstrap.Popover>
        }
      >
        <bootstrap.Badge variant="info">🛈</bootstrap.Badge>
      </bootstrap.OverlayTrigger>
    );
  }
}