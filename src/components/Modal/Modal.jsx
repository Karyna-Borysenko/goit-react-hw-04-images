import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  //----Вешаем EventListener ----
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  //----Снимаем EventListener ----
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  //----Нажатие на Escape ----
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  //----Нажатие на Overlay ----
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  //----Рендер----
  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalContainer>
          <img src={this.props.largeImageURL} alt={this.props.description} />
        </ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
