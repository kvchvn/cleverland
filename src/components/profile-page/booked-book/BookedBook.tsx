import React from 'react';

import { BOOKS_LIST_VIEW } from '../../../constants';
import { isTodayLaterThanDate } from '../../../helpers';
import { useResetBookingMutation } from '../../../store';
import { EmptyContainerType, ToastActions, UserBooking } from '../../../types';
import { EmptyContainer } from '../../common/empty-container';
import { Loading } from '../../global/loading';
import { Toast } from '../../global/toast';
import { BookCard } from '../../main-page/book-card';

import styles from './BookedBook.module.scss';

type BookedBookProps = {
  booking: UserBooking;
};

export const BookedBook = ({ booking }: BookedBookProps) => {
  const [resetBooking, { isLoading, isError, isSuccess }] = useResetBookingMutation();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (booking.id && booking.book) {
      resetBooking({ bookingId: String(booking.id), bookId: String(booking.book.id) });
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : <Toast success={isSuccess} error={isError} actionName={ToastActions.ResetBooking} />}
      {booking.book ? (
        <ul className={styles['booked-book__container']}>
          <BookCard book={booking.book} view={BOOKS_LIST_VIEW}>
            <button
              type='button'
              onClick={handleClick}
              className={styles['button_reset-booking']}
              data-test-id='cancel-booking-button'
            >
              Отменить бронь
            </button>
          </BookCard>
          {booking?.dateOrder && isTodayLaterThanDate(booking.dateOrder) && (
            <EmptyContainer type={EmptyContainerType.Warning} dataTestId='expired'>
              <h3>
                Дата бронирования <br /> книги истекла
              </h3>
              <p>Через 24 часа книга будет доступна всем</p>
            </EmptyContainer>
          )}
        </ul>
      ) : (
        <EmptyContainer dataTestId='empty-blue-card'>
          <h3>
            Забронируйте книгу <br /> и она отобразится
          </h3>
        </EmptyContainer>
      )}
    </>
  );
};
