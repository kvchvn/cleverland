import React, { useState } from 'react';
import classnames from 'classnames';

import { BASE_API_URL } from '../../../constants';
import { Nullable } from '../../../types';

import styles from './ProgressiveImage.module.scss';

type ProgressiveImageProps = {
  alt: string;
  defaultSrc: string;
  src?: Nullable<string>;
};

export const ProgressiveImage = ({ src, defaultSrc, alt }: ProgressiveImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const complexStyles = {
    imageBox: classnames(styles['progressive-image-box'], { [styles.image_loaded]: !isImageLoaded }),
    image: classnames(styles['progressive-image__image'], { [styles.image_hidden]: !isImageLoaded }),
  };

  const handleLoad = () => setIsImageLoaded(true);

  const handleError = (e: React.SyntheticEvent) => {
    if (!isImageLoaded) {
      const target = e.target as HTMLImageElement;

      target.src = defaultSrc;
      setIsImageLoaded(true);
    }
  };

  return (
    <div className={complexStyles.imageBox}>
      <img
        src={src || defaultSrc}
        loading='lazy'
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={complexStyles.image}
      />
    </div>
  );
};
