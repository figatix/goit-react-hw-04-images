import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, StyledOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handlerCloseModal)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerCloseModal);
  }

  handlerCloseModal = (e) => {
    const isEscBtn = e.code === "Escape";
    const isBackdrop = e.target === e.currentTarget;

    if (isEscBtn || isBackdrop) {
      this.props.onCloseModal()
    }
  }

  render() {

    return createPortal(
      <StyledOverlay onClick={this.handlerCloseModal}>
        <StyledModal >
          {this.props.children}
        </StyledModal>
      </StyledOverlay>,
      modalRoot
    )
  }
}