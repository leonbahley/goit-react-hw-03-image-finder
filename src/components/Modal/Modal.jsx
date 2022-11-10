import React, { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img
            src="https://pixabay.com/get/g49b76cc06e39d3e2500a7b39af2064f1232934cfde19ab7e1289d6133b30e516f1b850b506af4c814742a7b26a0e798168f8c5d619facb3a019e3b318f8ffd9e_1280.jpg"
            alt=""
          />
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}
