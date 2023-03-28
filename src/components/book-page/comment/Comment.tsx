import React from 'react';

import default_avatar from '../../../assets/svg/default_avatar.svg';
import { formatDate } from '../../../helpers';
import { BookComment } from '../../../types';
import { ProgressiveImage } from '../../common/progressive-image';
import { RatingStars } from '../../common/rating-stars';

import styles from './Comment.module.scss';

type CommentProps = {
  comment: BookComment;
};

export const Comment = ({ comment: { user, rating, createdAt, text } }: CommentProps) => {
  const formattedDate = formatDate({ date: createdAt, mode: 'long' });

  return (
    <li className={styles['comment-box']} data-test-id='comment-wrapper'>
      <div className={styles['comment__author-box']}>
        <div className={styles['author-box__avatar']}>
          <ProgressiveImage src={user.avatarUrl} defaultSrc={default_avatar} alt='Аватар' />
        </div>
        <p data-test-id='comment-author'>
          {user.firstName} {user.lastName}
        </p>
        <p data-test-id='comment-date'>{formattedDate}</p>
      </div>
      <div className={styles['comment__rating-box']}>
        <ul data-test-id='rating'>
          <RatingStars rating={rating} canBeChanged={false} />
        </ul>
      </div>
      {text && <p data-test-id='comment-text'>{text}</p>}
    </li>
  );
};
