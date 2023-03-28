import React from 'react';

import { CALENDAR } from '../../../../constants';
import { getAllMonthSundays } from '../../../../helpers';
import { Week } from '../week';

import styles from './Month.module.scss';

type MonthProps = {
  year: number;
  month: number;
};

export const Month = ({ year, month }: MonthProps) => {
  const sundayDates = getAllMonthSundays({ month, year });

  return (
    <div className={styles.month__container}>
      <ul className={styles['month__days-labels']}>
        {CALENDAR.labels.days.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      {sundayDates.map((sundayDate) => (
        <Week key={String(sundayDate)} sundayDate={sundayDate} />
      ))}
    </div>
  );
};
