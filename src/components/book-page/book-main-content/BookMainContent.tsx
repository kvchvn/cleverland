import React, { useCallback, useState } from 'react';
import classnames from 'classnames';

import { composeBookAuthorshipText, getBookingButtonText, isBookBaseType } from '../../../helpers';
import { useBooking } from '../../../hooks';
import { resetBooking, setBookForBooking, setBookingDate, useUserSelector } from '../../../store';
import { useAppDispatch } from '../../../store/store';
import { BookBase, BookModified, ModalWrapperType } from '../../../types';
import { Loading } from '../../global/loading';
import { ModalWrapper } from '../../global/modal-wrapper';
import { Toast } from '../../global/toast';
import { Booking } from '../../modals/booking';
import { BookPostersSlider } from '../book-posters-slider';

import styles from './BookMainContent.module.scss';

type BookMainContentProps = {
  // because of in tests data can be received with both of types
  book: BookModified | BookBase;
};

export const BookMainContent = ({ book }: BookMainContentProps) => {
  const [isModalBookingOpened, setIsModalBookingOpened] = useState(false);
  const user = useUserSelector();
  const dispatch = useAppDispatch();

  const complexStyles = {
    bookingButton: classnames(styles['book-main-content__button_booking'], { [styles.book_reserved]: book.booking }),
  };

  const bookingButtonText = getBookingButtonText(book.booking, book.delivery);

  const authorshipText = composeBookAuthorshipText({
    authors: book.authors,
    issueYear: isBookBaseType(book) ? book.issueYear : book.details.issueYear,
  });

  const handleCloseModalBooking = useCallback(() => {
    setIsModalBookingOpened(false);
    dispatch(resetBooking());
  }, [dispatch]);

  const handleOpenModalBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalBookingOpened(true);
    dispatch(setBookForBooking(book));

    if (book.booking?.dateOrder) {
      dispatch(setBookingDate(book.booking.dateOrder));
    }
  };

  const {
    actions,
    status: { isLoading, isError, isSuccess, actionName },
  } = useBooking({ effect: handleCloseModalBooking });

  return (
    <>
      {isLoading ? <Loading /> : <Toast success={isSuccess} error={isError} actionName={actionName} />}
      {isModalBookingOpened && (
        <ModalWrapper isOpened={isModalBookingOpened} closeFn={handleCloseModalBooking} type={ModalWrapperType.Booking}>
          <Booking actions={actions} />
        </ModalWrapper>
      )}
      <section className={styles['book-main-content__main-section']}>
        <BookPostersSlider posters={isBookBaseType(book) ? null : book.images} />
        <article className={styles['book-main-content__title-box']}>
          <h3 data-test-id='book-title'>{book.title}</h3>
          <h5>{authorshipText}</h5>
          <button
            type='button'
            onClick={handleOpenModalBooking}
            disabled={Boolean(book.delivery || (book.booking && user && book.booking.customerId !== user.id))}
            className={complexStyles.bookingButton}
            data-test-id='booking-button'
          >
            {bookingButtonText}
          </button>
        </article>
        {!isBookBaseType(book) && (
          <article className={styles['book-main-content__description-box']}>
            <h5>О книге</h5>
            <p>{book.description}</p>
          </article>
        )}
      </section>
    </>
  );
};
