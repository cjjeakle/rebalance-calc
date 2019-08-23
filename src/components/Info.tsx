import * as React from "react";
import * as Bootstrap from "react-bootstrap";

export interface IInfoProps {
  id: string;
  title: string;
  detail: string;
}

export class Info extends React.Component<IInfoProps> {
  render() {
    return (
      <Bootstrap.OverlayTrigger 
        trigger="hover"
        overlay={
        <Bootstrap.Popover id={this.props.id}>
          <Bootstrap.Popover.Title>{this.props.title}</Bootstrap.Popover.Title>
          <Bootstrap.Popover.Content>{this.props.detail}</Bootstrap.Popover.Content>
        </Bootstrap.Popover>
        }
      >
        <span>🛈</span>
      </Bootstrap.OverlayTrigger>
    );
  }
}