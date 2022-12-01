import React, { Component } from 'react';
import Modal from './Modal/Modal';
import css from './App.module.css';

import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    showModal: false,
    modalImg: null,
    modalDescr: null,
  };
  toggleModal = (largeImg, largeIMGDescr) => {
    this.setState({ modalImg: largeImg, modalDescr: largeIMGDescr });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <div className={css.App}>
        <ImageGallery onClick={this.toggleModal} />

        {this.state.showModal && (
          <Modal
            IMGDescr={this.state.modalDescr}
            largeImg={this.state.modalImg}
            onClose={this.toggleModal}
          >
            <img src={this.state.modalImg} alt={this.state.modalDescr} />
          </Modal>
        )}
      </div>
    );
  }
}
