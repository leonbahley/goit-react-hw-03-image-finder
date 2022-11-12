import React, { Component } from 'react';
import Item from '../item';
import { Dna } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class ImageGalleryItem extends Component {
  state = {
    page: 1,
    query: [],
    loading: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.query !== prevProps.query ||
      this.state.page !== prevState.page
    ) {
      console.log('loadmore');
      console.log(this.props.query);
      this.setState({ loading: true });
      // setTimeout(
      //   () =>
      fetch(`https://pixabay.com/api/?q=${this.props.query}&page=${this.state.page}&key=30826076-8f523437068dfd34b07c8f4ae&image_type=photo&orientation=horizontal&per_page=12
`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Something went wrong'));
        })
        // .then(images => this.setState({ query: images.hits }))
        .then(images =>
          this.setState({ query: [...this.state.query, ...images.hits] })
        )

        .catch(err => this.setState({ error: err }))
        .finally(() => this.setState({ loading: false }));
      //   3000
      // );
    }
  }
  handleClick = largeimg => {
    console.log(largeimg);
    this.props.onClick(largeimg);
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    return (
      <>
        {this.state.error && <div>{this.state.error.message}</div>}
        {this.state.loading && (
          <div>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
        {this.state.query &&
          this.state.query.map(item => (
            <Item
              key={item.id}
              onClick={this.handleClick}
              largeimg={item.largeImageURL}
              smallimg={item.webformatURL}
            />
          ))}
        <button type="button" onClick={this.handleLoadMore}>
          load more
        </button>
      </>
    );
  }
}
