import React from 'react';

import { CALENDAR } from '../../../constants';
import { useCalendar } from '../../../hooks';
import { Select } from '../select';

import { Month } from './month';

import styles from './Calendar.module.scss';

export const Calendar = () => {
  const {
    state,
    actions: { setPrevMonth, setNextMonth, setMonth },
  } = useCalendar();

  return (
    <div className={styles.calendar__container} data-test-id='calendar'>
      <article className={styles.article}>
        <Select
          currentOption={`${state.monthName} ${state.year}`}
          options={CALENDAR.labels.months}
          setValueFn={setMonth}
        />
        <div className={styles.calendar__controls}>
          <button
            type='button'
            onClick={setPrevMonth}
            className={styles['button-prev-month']}
            data-test-id='button-prev-month'
          />
          <button
            type='button'
            onClick={setNextMonth}
            className={styles['button-next-month']}
            data-test-id='button-next-month'
          />
        </div>
      </article>
      <Month year={state.year} month={state.month} />
    </div>
  );
};
