import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, description, onClose }) {
  useEffect(() => {
    //----Нажатие на Escape ----
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        onClose();
      }
    }
    //----Вешаем EventListener ----
    window.addEventListener('keydown', handleKeyDown);

    //----Снимаем EventListener ----
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  //----Нажатие на Overlay ----
  function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  //----Рендер----
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer>
        <img src={largeImageURL} alt={description} />
      </ModalContainer>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
