import React, { Component } from 'react';
import Item from '../item';
import { Audio } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class ImageGalleryItem extends Component {
  state = {
    query: null,
    loading: false,
    error: null,
  };
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      console.log(this.props.query);
      this.setState({ loading: true });
      setTimeout(
        () =>
          fetch(`https://pixabay.com/api/?q=${this.props.query}&page=1&key=30826076-8f523437068dfd34b07c8f4ae&image_type=photo&orientation=horizontal&per_page=12
`)
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(new Error('Something went wrong'));
            })
            .then(images => this.setState({ query: images }))
            .catch(err => this.setState({ error: err }))
            .finally(() => this.setState({ loading: false })),
        3000
      );
    }
  }
  handleClick = largeimg => {
    console.log(largeimg);
    this.props.onClick(largeimg);
  };
  render() {
    return (
      <>
        {this.state.error && <div>{this.state.error.message}</div>}
        {this.state.loading && (
          <div>
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        )}
        {this.state.query &&
          this.state.query.hits.map(item => (
            <Item
              onClick={this.handleClick}
              largeimg={item.largeImageURL}
              smallimg={item.webformatURL}
            />
          ))}
      </>
    );
  }
}
