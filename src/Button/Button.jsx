import React, { Component } from 'react';

export class Button extends Component {
  handleLoadMore = () => {
    this.props.onClick();
  };
  render() {
    return (
      <button className="Button" type="button" onClick={this.handleLoadMore}>
        load more
      </button>
    );
  }
}
