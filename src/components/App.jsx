import React, { Component } from 'react';
import Modal from './Modal';
import './styles.css';
export class App extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <>
        <button type="button" onClick={this.toggleModal}>
          click
        </button>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
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
