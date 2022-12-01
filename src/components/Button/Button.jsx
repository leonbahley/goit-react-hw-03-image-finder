import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export class Button extends Component {
  handleLoadMore = () => {
    this.props.onClick();
  };
  render() {
    return (
      <button
        className={css.Button}
        type="button"
        onClick={this.handleLoadMore}
      >
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
