import { useCallback, useState } from 'react';

import { CALENDAR } from '../constants';

type CalendarState = {
  year: number;
  month: number;
  monthName: string;
};

export const useCalendar = () => {
  const [state, setState] = useState<CalendarState>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    monthName: CALENDAR.labels.months[new Date().getMonth()],
  });

  const setPrevMonth = useCallback(() => {
    if (state.month === CALENDAR.firstMonthIndex) {
      setState((prevState) => ({
        ...prevState,
        year: prevState.year - 1,
        month: CALENDAR.lastMonthIndex,
        monthName: CALENDAR.labels.months[CALENDAR.lastMonthIndex],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        month: prevState.month - 1,
        monthName: CALENDAR.labels.months[prevState.month - 1],
      }));
    }
  }, [state.month]);

  const setNextMonth = useCallback(() => {
    if (state.month === CALENDAR.lastMonthIndex) {
      setState((prevState) => ({
        ...prevState,
        year: prevState.year + 1,
        month: CALENDAR.firstMonthIndex,
        monthName: CALENDAR.labels.months[CALENDAR.firstMonthIndex],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        month: prevState.month + 1,
        monthName: CALENDAR.labels.months[prevState.month + 1],
      }));
    }
  }, [state.month]);

  const setMonth = useCallback((monthName: string) => {
    const month = CALENDAR.labels.months.indexOf(monthName);

    if (month !== -1) {
      setState((prevState) => ({ ...prevState, month, monthName }));
    }
  }, []);

  return {
    actions: {
      setPrevMonth,
      setNextMonth,
      setMonth,
    },
    state,
  };
};
