import PropTypes from 'prop-types';
import React
, { useEffect }
  from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, StyledOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({ onCloseModal, children }) => {

  const handlerCloseModal = (e) => {
    const isEscBtn = e.code === "Escape";
    const isBackdrop = e.target === e.currentTarget;

    if (isEscBtn || isBackdrop) {
      onCloseModal()
    }
  }

  useEffect(() => {
    const keydownHandler = (e) => handlerCloseModal(e);
    window.addEventListener('keydown', keydownHandler)
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [handlerCloseModal])


  return createPortal(
    <StyledOverlay onClick={handlerCloseModal}>
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


