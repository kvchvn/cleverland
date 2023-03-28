import React from 'react';
import classnames from 'classnames';

import { useBookForBookingSelector, useBookingDateISOSelector, useUserSelector } from '../../../store';
import { Calendar } from '../../common/calendar';

import styles from './Booking.module.scss';

type BookingProps = {
  actions: {
    setBooking: () => void;
    updateBooking: () => void;
    resetBooking: () => void;
  };
};

export const Booking = ({ actions }: BookingProps) => {
  const bookingDateISO = useBookingDateISOSelector();
  const book = useBookForBookingSelector();
  const user = useUserSelector();

  const isUserWhoBooked = user && book && user.id === book.booking?.customerId;

  const complexStyles = {
    buttonSet: classnames(styles.button, styles.set),
    buttonReset: classnames(styles.button, styles.reset),
  };

  return (
    <div className={styles.box}>
      <h4 data-test-id='modal-title'>{isUserWhoBooked ? 'Изменение' : 'Выбор'} даты бронирования</h4>
      <Calendar />
      <button
        type='button'
        onClick={isUserWhoBooked ? actions.updateBooking : actions.setBooking}
        disabled={Boolean(!bookingDateISO || (book?.booking?.dateOrder === bookingDateISO && isUserWhoBooked))}
        className={complexStyles.buttonSet}
        data-test-id='booking-button'
      >
        Забронировать
      </button>
      {isUserWhoBooked && (
        <button
          type='button'
          onClick={actions.resetBooking}
          className={complexStyles.buttonReset}
          data-test-id='booking-cancel-button'
        >
          Отменить бронь
        </button>
      )}
    </div>
  );
};
