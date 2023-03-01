
import PropTypes from 'prop-types'
import Modal from 'components/Modal';
import React, { Component } from 'react';
import { StyledImageGalleryItem, StyledImageGalleryItemImg } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    srcOriginal: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  state = {
    isOpenModal: false,
    currentImg: null,
  }

  handlerCurrentImg = (id) => {
    const currImg = this.props.images.find(el => el.id === id)
    this.setState({
      currentImg: currImg,
      isOpenModal: true,
    })
  }

  onCloseModal = () => {
    this.setState({
      isOpenModal: false,
    })
  }

  render() {
    const { id, src, alt, srcOriginal } = this.props;

    return (
      <StyledImageGalleryItem>
        <StyledImageGalleryItemImg src={src} alt={alt} onClick={() => this.handlerCurrentImg(id)} />
        {
          this.state.isOpenModal &&
          <Modal
            onCloseModal={this.onCloseModal}
          >
            <img id={id} src={srcOriginal} alt={alt} width="1000" />
          </Modal>
        }
      </StyledImageGalleryItem>
    )
  }

}






