
import PropTypes from 'prop-types'
import { Modal } from 'components/Modal';
import React, { useState } from 'react';
import { StyledImageGalleryItem, StyledImageGalleryItemImg } from './ImageGalleryItem.styled';



export const ImageGalleryItem = ({ id, src, alt, srcOriginal }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handlerCurrentImg = () => {
    setIsOpenModal(true)
  }

  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <StyledImageGalleryItem>
      <StyledImageGalleryItemImg src={src} alt={alt} onClick={() => handlerCurrentImg()} />
      {
        isOpenModal &&
        <Modal
          onCloseModal={onCloseModal}
        >
          <img id={id} src={srcOriginal} alt={alt} width="1000" />
        </Modal>
      }
    </StyledImageGalleryItem>
  )
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcOriginal: PropTypes.string.isRequired,
}
