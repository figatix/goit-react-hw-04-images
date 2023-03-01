
import ImageGalleryItem from 'components/ImageGalleryItem'
import React, { Component } from 'react';
import { StyledImageGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types'


export default class ImageGallery extends Component {
  static propTypes = {
    queryHits: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  render() {
    const { queryHits } = this.props;
    const galleryItems = queryHits.map(img => (
      <ImageGalleryItem
        key={img.id}
        id={img.id}
        src={img.webformatURL}
        srcOriginal={img.largeImageURL}
        alt={img.tags}
        images={queryHits}
      />
    ));

    return (
      <>
        <StyledImageGallery className='gallery' >
          {galleryItems}
        </StyledImageGallery>
      </>
    )
  }

}