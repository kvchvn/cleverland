import React, { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import stringReplace from 'react-string-replace';
import classnames from 'classnames';

import default_poster from '../../../assets/svg/default_poster.svg';
import { ROUTES } from '../../../constants';
import { composeBookAuthorshipText, getBookingButtonText, isBookBaseType } from '../../../helpers';
import { useSearchValueSelector, useUserSelector } from '../../../store';
import { BookBase, BooksView, UserBook } from '../../../types';
import { ProgressiveImage } from '../../common/progressive-image';
import { RatingStars } from '../../common/rating-stars';

import styles from './BookCard.module.scss';

type BookCardProps = {
  book: BookBase | UserBook;
  view: BooksView;
  openBookingModalFn?: (book: BookBase) => void;
  children?: React.ReactNode;
};

export const BookCard = memo(({ book, view, openBookingModalFn, children }: BookCardProps) => {
  const searchValue = useSearchValueSelector();
  const user = useUserSelector();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const complexStyles = {
    bookCard: classnames(styles['book-card'], styles[`${view}-view`]),
    button: classnames({ [styles.book_reserved]: isBookBaseType(book) && book.booking }),
  };

  const bookingButtonText = isBookBaseType(book) ? getBookingButtonText(book.booking, book.delivery) : '';
  const authorshipText = composeBookAuthorshipText({
    authors: book.authors,
    issueYear: book.issueYear,
  });

  const handleClickCard = () => {
    const path = pathname === ROUTES.profile ? ROUTES.books.all : pathname;

    navigate(`${path}/${book.id}`);
  };

  const handleClickButton = (e: React.MouseEvent) => {
    if (isBookBaseType(book) && openBookingModalFn) {
      e.stopPropagation();
      openBookingModalFn(book);
    }
  };

  return (
    <li onClick={handleClickCard} className={complexStyles.bookCard} data-test-id='card'>
      <div className={styles['book-card__poster-box']}>
        <ProgressiveImage
          src={isBookBaseType(book) ? book.image?.url : book.image}
          defaultSrc={default_poster}
          alt={book.title}
        />
      </div>
      <div className={styles['book-card__info-box']}>
        <div className={styles['book-card__rating']}>
          {book.rating ? (
            <ul>
              <RatingStars rating={Math.round(book.rating)} canBeChanged={false} />
            </ul>
          ) : (
            <p>еще нет оценок</p>
          )}
        </div>
        <p className={styles['book-card__title']}>
          {stringReplace(book.title, searchValue.trim(), (match, index) => (
            <span key={index} data-test-id='highlight-matches'>
              {match}
            </span>
          ))}
        </p>
        <p className={styles['book-card__authorship']}>{authorshipText}</p>
        <div className={styles['book-card__button-box']}>
          {children ? (
            children
          ) : (
            <button
              type='button'
              disabled={Boolean(
                isBookBaseType(book) && (book.delivery || (book.booking && user && book.booking.customerId !== user.id))
              )}
              onClick={handleClickButton}
              className={complexStyles.button}
              data-test-id='booking-button'
            >
              {bookingButtonText}
            </button>
          )}
        </div>
      </div>
    </li>
  );
});

BookCard.displayName = 'BookCard';
