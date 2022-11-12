import React, { Component } from 'react';
import Modal from './Modal/Modal';
import './styles.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
export class App extends Component {
  state = {
    query: null,
    showModal: false,
    modalimg: null,
  };
  toggleModal = largeimg => {
    console.log(this.state.modalimg);
    this.setState({ modalimg: largeimg });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  handleSearchbarSubmit = query => {
    this.setState({ query });
  };
  render() {
    return (
      <>
        <Searchbar onSearch={this.handleSearchbarSubmit} />
        <ImageGalleryItem onClick={this.toggleModal} query={this.state.query} />
        <button type="button" onClick={this.toggleModal}>
          click
        </button>
        {this.state.showModal && (
          <Modal largeimg={this.state.modalimg} onClose={this.toggleModal}>
            <button type="button" onClick={this.toggleModal}>
              click
            </button>
          </Modal>
        )}
        {}
      </>
    );
  }
}
