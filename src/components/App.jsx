import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import toast, { Toaster } from 'react-hot-toast';

import { fetchImages } from './PixabayAPI';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { Text } from './App.styled';

export default function App() {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);

  useEffect(() => {
    if (!input) {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);

        const foundImages = await fetchImages(input, page);

        setImages(prevImages => [...prevImages, ...foundImages.hits]);
        setLoading(false);
        setVisibleLoadMore(!(page * 12 >= foundImages.totalHits));

        if (foundImages.hits.length === 0) {
          toast('No pictures with this title', { icon: '😢' });
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [input, page]);

  //----Записываем значение при отправке----
  function handleFormSubmit(input) {
    setImages([]);
    setInput(input);
    setPage(1);
  }

  //----Загрузить ещё----
  function loadMore() {
    setPage(prevPage => prevPage + 1);
    scroll.scrollToBottom();
  }

  //----Рендер----
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {!input && <Text>Enter image name, please!</Text>}

      {!loading && images && <ImageGallery images={images} />}

      {loading && <Loader loading={loading} />}

      {visibleLoadMore && <Button onClick={loadMore} />}

      <Toaster position="top-right" />
    </>
  );
}
