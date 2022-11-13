import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Dna } from 'react-loader-spinner';
import { Button } from 'Button/Button';

export default class ImageGallery extends Component {
  state = {
    page: 1,
    query: [],
    loading: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.setState({ query: [] });
    }
    if (
      this.props.query !== prevProps.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({ loading: true });
      fetch(`https://pixabay.com/api/?q=${this.props.query}&page=${this.state.page}&key=30826076-8f523437068dfd34b07c8f4ae&image_type=photo&orientation=horizontal&per_page=12
`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Something went wrong'));
        })
        .then(images => {
          if (images.hits.length === 0) {
            alert('No such images');
          }
          return this.setState({
            query: [...this.state.query, ...images.hits],
          });
        })
        .catch(err => this.setState({ error: err }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  handleClick = (largeImg, IMGDescr) => {
    this.props.onClick(largeImg, IMGDescr);
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    return (
      <>
        {this.state.error && <div>{this.state.error.message}</div>}
        {this.state.loading && (
          <div className="Loader">
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
        {this.state.query.length !== 0 && (
          <ul className="ImageGallery">
            {this.state.query.map(item => (
              <ImageGalleryItem
                key={item.id}
                onClick={this.handleClick}
                IMGDescr={item.tags}
                largeImg={item.largeImageURL}
                smallImg={item.webformatURL}
              />
            ))}
          </ul>
        )}
        {this.state.query.length !== 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
      </>
    );
  }
}
