import React, { Component } from 'react';
import Item from '../item';
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
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    return (
      <>
        {this.state.error && <div>{this.state.error.message}</div>}
        {this.state.loading && <div>loading</div>}
        {this.state.query &&
          this.state.query.hits.map(item => (
            <Item smallimg={item.webformatURL} />
          ))}
      </>
    );
  }
}
