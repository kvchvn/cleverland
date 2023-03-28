import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import { MAX_RATING } from '../../../constants';
import { Nullable } from '../../../types';

import styles from './RatingStars.module.scss';

type RatingStarsProps = {
  rating: number;
  canBeChanged: boolean;
  changeFn?: (newRating: number) => void;
};

export const RatingStars = memo(({ rating, canBeChanged, changeFn }: RatingStarsProps) => {
  const [ratingOnHover, setRatingOnHover] = useState<Nullable<number>>(null);
  const parentRef = useRef<HTMLElement | null>(null);

  const handleParentMouseLeave = useCallback(() => setRatingOnHover(null), []);

  const handleMouseOver = ({ e, index }: { e: React.MouseEvent; index: number }) => {
    const target = e.target as HTMLElement;

    if (canBeChanged) {
      setRatingOnHover(index + 1);

      parentRef.current = target.closest('ul');

      if (parentRef.current) {
        parentRef.current.addEventListener('mouseleave', handleParentMouseLeave);
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (canBeChanged) {
      const target = e.target as HTMLLIElement;
      const { clientX } = e;
      const { left } = target.getBoundingClientRect();

      if (clientX <= left) {
        setRatingOnHover((prevState) => (typeof prevState === 'number' ? prevState - 1 : null));
      }
    }
  };

  const handleClick = (index: number) => {
    if (canBeChanged && changeFn) {
      if (index !== rating - 1) {
        changeFn(index + 1);
      }
      setRatingOnHover(null);
    }
  };

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.removeEventListener('mouseleave', handleParentMouseLeave);
    }
  }, [handleParentMouseLeave]);

  return (
    <>
      {Array(MAX_RATING)
        .fill(0)
        .map((_, index) => {
          // in order to eslint has no complaints
          const key = index;

          const className = classnames(styles.star, {
            [styles.star_hovered]: ratingOnHover && ratingOnHover > index,
            [styles.star_chosen]: ratingOnHover ? false : rating > index,
          });

          return (
            <li key={key} className={className} data-test-id='star'>
              <span
                onMouseOver={(e) => handleMouseOver({ e, index })}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(index)}
                data-test-id={rating > index && 'star-active'}
              />
            </li>
          );
        })}
    </>
  );
});

RatingStars.displayName = 'StarItems';
