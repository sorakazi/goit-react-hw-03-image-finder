import React, { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getAPI } from 'pixabay-api';
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    isError: false,
    isEnd: false,
  };

  constructor(props) {
    super(props);
    this.endOfListRef = React.createRef();
  }

  async componentDidUpdate(_prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      await this.fetchImages();
      if (currentPage !== 1){
        setTimeout(() =>
        this.endOfListRef.current?.scrollIntoView({ behavior: 'smooth' }), 500);
      }
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true, isError: false });

    const { searchQuery, currentPage } = this.state;

    try {
      const response = await getAPI(searchQuery, currentPage);
      const { totalHits, hits } = response;

      this.setState(prevState => ({
        images: currentPage === 1 ? hits : [...prevState.images, ...hits],
        isLoading: false,
        isEnd: prevState.images.length + hits.length >= totalHits,
      }));

      if (hits.length === 0) {
        toast('No images found. Try a different search.');
      }
    } catch (error) {
      this.setState({ isLoading: false, isError: true });
      toast.error(`An error occurred while fetching data: ${error}`);
    }
  };

  handleSearchSubmit = query => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedCurrentQuery = this.state.searchQuery.toLowerCase();

    if (normalizedQuery === '') {
      toast.error(`Empty string is not a valid search query. Please type again.`);
      return;
    }

    if (normalizedQuery === normalizedCurrentQuery) {
      toast.error(
        `Search query is the same as the previous one. Please provide a new search query.`
      );
      return;
    }

    if (normalizedQuery !== normalizedCurrentQuery) {
      this.setState({
        searchQuery: normalizedQuery,
        currentPage: 1,
        images: [],
        isEnd: false,
      });
    }
  };

  handleLoadMore = () => {
    if (!this.state.isEnd) {
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    } else {
      toast("You've reached the end of the search results.");
    }
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className={styles.App}>
        <div><Toaster position="top-right" /></div>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} />
        <div ref={this.endOfListRef}></div>
        {isLoading && <Loader />}
        {!isLoading && !isError && images.length > 0 && !isEnd && (
          <Button onClick={this.handleLoadMore} />
        )}

        {isError && <p>Something went wrong. Please try again later.</p>}
      </div>
    );
  }
}

export default App;
