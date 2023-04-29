import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import getImages from '../../services/pixabay-api';
import Loader from 'components/Loader';
import { ToastContainer, toast } from 'react-toastify';

import css from './App.module.css';

const PAGE_SIZE = 12;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    handleFindImages();
  }, [searchQuery, page]);

  async function handleFindImages() {
    setIsLoading(true);
    try {
      const data = await getImages(searchQuery, page, PAGE_SIZE);

      if (!data.images.length) {
        toast.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      setImages(prevImages => [...prevImages, ...data.images]);

      setShowLoadMoreBtn(page < Math.ceil(data.total / PAGE_SIZE));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSubmitForm = searchQuery => {
    setImages([]);
    setShowLoadMoreBtn(false);
    setSearchQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <ToastContainer autoClose={2500} />
      <Searchbar onSubmit={onSubmitForm} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {showLoadMoreBtn && <Button onClick={loadMore} />}
    </div>
  );
}
