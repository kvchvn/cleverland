import React from 'react';

import { BookComment, BookDetailsModified, Nullable } from '../../../types';
import { RatingStars } from '../../common/rating-stars';
import { BookDetails } from '../book-details';
import { CommentsList } from '../comments-list';

import styles from './BookSubContent.module.scss';

type BookSubContentProps = {
  rating: Nullable<number>;
  details?: BookDetailsModified;
  comments?: Nullable<BookComment[]>;
};

export const BookSubContent = ({ rating, details, comments }: BookSubContentProps) => (
  <section className={styles['book-sub-content__section']}>
    <article className={styles['book-sub-content__article']}>
      <h5>Рейтинг</h5>
      <div className={styles['book-sub-content__rating']}>
        {rating ? (
          <>
            <ul>
              <RatingStars rating={Math.round(rating)} canBeChanged={false} />
            </ul>
            <span>{rating.toFixed(1)}</span>
          </>
        ) : (
          <p>еще нет оценок</p>
        )}
      </div>
    </article>
    <article className={styles['book-sub-content__article']}>
      <h5>Подробная информация</h5>
      <BookDetails details={details} />
    </article>
    <article className={styles['book-sub-content__article']} data-test-id='reviews'>
      <CommentsList comments={comments} />
    </article>
  </section>
);
