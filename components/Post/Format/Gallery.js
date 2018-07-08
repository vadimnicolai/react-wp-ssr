import React, { Fragment } from 'react';
import LazyloadedImage from '../Image/LazyloadedImage';

const Gallery = props => {
  const { imageGallery } = props;

  return (
    <Fragment>
      {imageGallery &&
        imageGallery.map(({ image }) => (
          <LazyloadedImage key={image.id} {...image} />
        ))}
    </Fragment>
  );
};

export default Gallery;
