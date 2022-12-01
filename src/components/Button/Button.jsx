import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Button extends Component {
  handleLoadMore = () => {
    this.props.onClick();
  };
  render() {
    return (
      <button className="Button" type="button" onClick={this.handleLoadMore}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
