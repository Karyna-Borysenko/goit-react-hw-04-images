import { useState } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  description,
}) {
  const [showModal, setShowModal] = useState(false);

  //----Показываем или скрываем модалку----
  function toggalModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <GalleryItem>
        <GalleryImage
          src={webformatURL}
          alt={description}
          onClick={toggalModal}
        />

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            description={description}
            onClose={toggalModal}
          />
        )}
      </GalleryItem>
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
