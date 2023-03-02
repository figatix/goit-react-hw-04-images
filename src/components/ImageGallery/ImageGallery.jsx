
import { ImageGalleryItem } from 'components/ImageGalleryItem'
import React from 'react';
import { StyledImageGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { PER_PAGE } from 'components/App';

export const ImageGallery = ({ queryHits }) => {

  useEffect(() => {
    const scroll = () => {
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild?.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 1.5,
        behavior: 'smooth',
      });
    }
    if (queryHits.length < PER_PAGE + 1) return;
    scroll();
  }, [queryHits]);

  const galleryItems = queryHits.map(img => (
    <ImageGalleryItem
      key={img.id}
      id={img.id}
      src={img.webformatURL}
      srcOriginal={img.largeImageURL}
      alt={img.tags}
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

ImageGallery.propTypes = {
  queryHits: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}