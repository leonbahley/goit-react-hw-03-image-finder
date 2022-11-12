import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.largeImg, this.props.IMGDescr);
  };
  render() {
    return (
      <li className="ImageGalleryItem" onClick={this.handleClick}>
        <img
          className="ImageGalleryItem-image"
          src={this.props.smallImg}
          alt={this.props.IMGDescr}
        />
      </li>
    );
  }
}
