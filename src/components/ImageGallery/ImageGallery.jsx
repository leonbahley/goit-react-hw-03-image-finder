import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Dna } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import Searchbar from 'components/Searchbar/Searchbar';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    searchQuery: null,
    page: 1,
    query: [],
    loading: false,
    error: null,
    showLoadMore: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState({ query: [] });
    }
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.setState({ loading: true });
      fetch(`https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=30826076-8f523437068dfd34b07c8f4ae&image_type=photo&orientation=horizontal&per_page=12
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
          if (images.hits.length < 12) {
            this.setState({ showLoadMore: false });
          } else {
            this.setState({ showLoadMore: true });
          }
          this.setState({ loadQuantity: images.hits.length });
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
  handleSearch = query => {
    this.setState({ page: 1 });
    this.setState({ searchQuery: query });
  };
  render() {
    let { showLoadMore } = this.state;

    return (
      <>
        <Searchbar onSearch={this.handleSearch} />
        {this.state.error && <div>{this.state.error.message}</div>}

        {this.state.query.length !== 0 && (
          <ul className={css.ImageGallery}>
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
        {this.state.loading && (
          <div className={css.Loader}>
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
        {showLoadMore && <Button onClick={this.handleLoadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
};
