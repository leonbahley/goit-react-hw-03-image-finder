import React, { Component } from 'react';
import Modal from './Modal/Modal';
import './styles.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: null,
    showModal: false,
    modalImg: null,
    modalDescr: null,
  };
  toggleModal = (largeImg, largeIMGDescr) => {
    this.setState({ modalImg: largeImg, modalDescr: largeIMGDescr });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  handleSearchbarSubmit = query => {
    this.setState({ query });
  };
  render() {
    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearchbarSubmit} />
        <ImageGallery onClick={this.toggleModal} query={this.state.query} />

        {this.state.showModal && (
          <Modal
            IMGDescr={this.state.modalDescr}
            largeImg={this.state.modalImg}
            onClose={this.toggleModal}
          >
            <button type="button" onClick={this.toggleModal}>
              click
            </button>
          </Modal>
        )}
      </div>
    );
  }
}
