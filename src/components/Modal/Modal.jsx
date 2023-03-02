import PropTypes from 'prop-types';
import React
  , { useEffect }
  from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, StyledOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({ onCloseModal, children }) => {
  
  useEffect(() => {
    const onEscKeyDown = e => {
      const isEscBtn = e.code === "Escape";
      if (isEscBtn) {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', onEscKeyDown)
    return () => window.removeEventListener('keydown', onEscKeyDown);
  }, [onCloseModal])

  const handlerCloseModalByClick = (e) => {
    const isBackdrop = e.target === e.currentTarget;
    if (isBackdrop) {
      onCloseModal()
    }
  }

  return createPortal(
    <StyledOverlay onClick={handlerCloseModalByClick}>
      <StyledModal >
        {children}
      </StyledModal>
    </StyledOverlay>,
    modalRoot
  )
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
}
