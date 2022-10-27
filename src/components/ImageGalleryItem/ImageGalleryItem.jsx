import React from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };

  //----Показываем или скрываем модалку----
  toggalModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  //----Рендер----
  render() {
    const { webformatURL, largeImageURL, description } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <GalleryItem>
          <GalleryImage
            src={webformatURL}
            alt={description}
            onClick={this.toggalModal}
          />

          {showModal && (
            <Modal
              largeImageURL={largeImageURL}
              description={description}
              onClose={this.toggalModal}
            />
          )}
        </GalleryItem>
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
