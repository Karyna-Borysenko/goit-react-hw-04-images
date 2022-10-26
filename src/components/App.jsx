import React from 'react';
import { animateScroll as scroll } from 'react-scroll';

import toast, { Toaster } from 'react-hot-toast';

import { fetchImages } from './PixabayAPI';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { Text } from './App.styled';

class App extends React.Component {
  state = {
    images: [],
    input: '',
    page: 1,
    loading: false,
    loadMore: false,
    visibleLoadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    try {
      //----Для поиска----
      if (prevState.input !== this.state.input) {
        this.setState({ loading: true });

        const foundImages = await fetchImages(
          this.state.input,
          this.state.page
        );

        this.setState({
          images: [...foundImages.hits],
          loading: false,
          visibleLoadMore: foundImages.hits.length !== foundImages.totalHits,
        });

        if (foundImages.hits.length === 0) {
          toast('No pictures with this title', {
            icon: '😢',
          });
          return;
        }
      }

      //----Для loadMore----
      if (this.state.loadMore) {
        this.setState({
          images: prevState.images,
          loading: true,
          loadMore: false,
        });
        const foundImages = await fetchImages(
          this.state.input,
          this.state.page
        );

        let images = [...prevState.images, ...foundImages.hits];
        this.setState({
          images: images,
          loading: false,
          visibleLoadMore: images.length !== foundImages.totalHits,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //----Записываем значение при отправке----
  handleFormSubmit = input => {
    this.setState({ input, page: 1 });
  };

  //----Загрузить ещё----
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loadMore: true,
    }));
    scroll.scrollToBottom();
  };

  //----Рендер----
  render() {
    const { input, loading, images, visibleLoadMore } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {!input && <Text>Enter image name, please!</Text>}

        {!loading && images && <ImageGallery images={images} />}

        {loading && <Loader loading={loading} />}

        {visibleLoadMore && <Button onClick={this.loadMore} />}

        <Toaster position="top-right" />
      </>
    );
  }
}

export default App;
