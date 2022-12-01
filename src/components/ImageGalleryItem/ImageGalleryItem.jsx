import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.largeImg, this.props.IMGDescr);
  };
  render() {
    return (
      <li className={css.ImageGalleryItem} onClick={this.handleClick}>
        <img
          className={css.ImageGalleryItemImage}
          src={this.props.smallImg}
          alt={this.props.IMGDescr}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  IMGDescr: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
};
