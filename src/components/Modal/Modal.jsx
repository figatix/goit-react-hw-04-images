import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, StyledOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, children }) => {
  const handlerCloseModal = useCallback((e) => {
    const isEscBtn = e.code === 'Escape';
    const isBackdrop = e.target === e.currentTarget;

    if (isEscBtn || isBackdrop) {
      onCloseModal();
    }
  }, [onCloseModal]);

  useEffect(() => {
    window.addEventListener('keydown', handlerCloseModal);

    return () => {
      window.removeEventListener('keydown', handlerCloseModal);
    };
  }, [handlerCloseModal]);

  return createPortal(
    <StyledOverlay onClick={handlerCloseModal}>
      <StyledModal>{children}</StyledModal>
    </StyledOverlay>,
    modalRoot,
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
