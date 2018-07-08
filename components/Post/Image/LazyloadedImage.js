import React from 'react';
import LazyLoad from 'react-lazyload';

const LazyloadedImage = props => {
  const {
    sizes: { large, 'large-height': largeHeight }
  } = props;

  return (
    <LazyLoad height={largeHeight} offset={100} throttle={100}>
      <img src={large} />
    </LazyLoad>
  );
};

export default LazyloadedImage;
