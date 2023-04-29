import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import getImages from '../../services/pixabay-api';
import Loader from 'components/Loader';
import { ToastContainer, toast } from 'react-toastify';

import css from './App.module.css';

const PAGE_SIZE = 12;

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    showLoadMoreBtn: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const data = await getImages(searchQuery, page, PAGE_SIZE);

        if (!data.images.length) {
          toast.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.images],
          showLoadMoreBtn: page < Math.ceil(data.total / PAGE_SIZE),
        }));
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSubmitForm = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      isEmpty: false,
      showLoadMoreBtn: false,
    });
  };

  render() {
    const { images, isLoading, showLoadMoreBtn } = this.state;
    return (
      <div className={css.app}>
        <ToastContainer autoClose={2500} />
        <Searchbar onSubmit={this.onSubmitForm} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {showLoadMoreBtn && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}

export default App;
