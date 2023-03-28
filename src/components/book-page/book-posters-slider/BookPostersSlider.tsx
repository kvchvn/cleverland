import React, { useState } from 'react';
import classnames from 'classnames';
import type SwiperType from 'swiper';
import { Mousewheel, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import default_poster from '../../../assets/svg/default_poster.svg';
import { BookImage, Nullable } from '../../../types';
import { ProgressiveImage } from '../../common/progressive-image';

import './swiper.scss';
import styles from './BookPostersSlider.module.scss';

import 'swiper/scss';
import 'swiper/scss/pagination';

type BookPostersSliderProps = {
  posters: Nullable<BookImage[]>;
};

export const BookPostersSlider = ({ posters }: BookPostersSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const complexStyles = {
    mainSlider: classnames(styles['book-posters__slider'], styles.slider_main),
    subSlider: classnames(styles['book-posters__slider'], styles.slider_sub),
  };

  return (
    <div className={styles['book-posters__box']}>
      {posters && posters.length > 1 ? (
        <>
          <Swiper
            modules={[Thumbs, Pagination]}
            spaceBetween={10}
            pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 8 }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className={complexStyles.mainSlider}
            data-test-id='slide-big'
          >
            {posters.map((poster, index) => (
              <SwiperSlide key={poster.url} virtualIndex={index} className={styles.slider__slide}>
                <ProgressiveImage src={poster.url} defaultSrc={default_poster} alt='Постер книги' />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            modules={[Thumbs, Mousewheel]}
            spaceBetween={10}
            slidesPerView={Math.min(5, posters.length)}
            watchSlidesProgress={true}
            onSwiper={setThumbsSwiper}
            mousewheel={true}
            className={complexStyles.subSlider}
            data-test-id='slide-mini'
          >
            {posters.map((poster, index) => (
              <SwiperSlide key={poster.url} virtualIndex={index} className={styles.slider__slide}>
                <ProgressiveImage src={poster.url} defaultSrc={default_poster} alt='Постер книги' />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className={styles['book-posters__single-poster']}>
          <ProgressiveImage src={posters?.[0]?.url} defaultSrc={default_poster} alt='Постер книги' />
        </div>
      )}
    </div>
  );
};
