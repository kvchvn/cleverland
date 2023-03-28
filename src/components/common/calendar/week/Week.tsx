import React from 'react';
import classnames from 'classnames';

import {
  convertToISODate,
  getDatesOfWeek,
  isMondayAfterNearestWeekends,
  isToday,
  isTomorrow,
  isWeekend,
} from '../../../../helpers';
import { setBookingDate, useBookingDateISOSelector } from '../../../../store';
import { useAppDispatch } from '../../../../store/store';

import styles from './Week.module.scss';

type WeekProps = {
  sundayDate: Date;
};

export const Week = ({ sundayDate }: WeekProps) => {
  const bookingDateISO = useBookingDateISOSelector();
  const dispatch = useAppDispatch();

  const datesOfWeek = getDatesOfWeek(sundayDate);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    if (target.value !== bookingDateISO) {
      dispatch(setBookingDate(target.value));
    }
  };

  return (
    <ul className={styles['week__dates-list']}>
      {datesOfWeek.map((date) => {
        const isWeekendDate = isWeekend(date);
        const isTodayDate = isToday(date);
        const isTomorrowDate = isTomorrow(date);
        const isMondayAfterNearestWeekendsDate = isMondayAfterNearestWeekends(date);

        const enabled =
          ((isTomorrowDate || isTodayDate) && !isWeekendDate) ||
          isMondayAfterNearestWeekendsDate ||
          bookingDateISO === convertToISODate(date);

        const className = classnames({
          [styles['date-today']]: isTodayDate,
          [styles['date-weekend']]: isWeekendDate,
          [styles['date-active']]: bookingDateISO === convertToISODate(date),
        });

        return (
          <li key={String(date)} className={className}>
            <button
              type='button'
              value={convertToISODate(date)}
              onClick={handleClick}
              disabled={!enabled}
              data-test-id='day-button'
            >
              {date.getDate()}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
