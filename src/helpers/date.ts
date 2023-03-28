import { CALENDAR, MS_IN_DAY } from '../constants';

export const formatDate = ({ date, mode }: { date: string; mode: 'short' | 'long' }) => {
  switch (mode) {
    case 'long':
      return new Date(date)
        .toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
        .replace('г.', '')
        .trim();
    case 'short':
    default:
      return new Date(date).toLocaleDateString('ru-RU').split('.').slice(0, 2).join('.');
  }
};

export const isToday = (date: Date) => {
  const copyDate = new Date(date);

  return copyDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
};

export const isTomorrow = (date: Date) => {
  const copyDate = new Date(date);

  return copyDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) + MS_IN_DAY;
};

export const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

export const isMondayAfterNearestWeekends = (date: Date) => {
  const todayTimestamp = new Date().setHours(0, 0, 0, 0);
  const copyDate = new Date(date);

  const timeDifference = copyDate.setHours(0, 0, 0, 0) - todayTimestamp;

  return copyDate.getDay() === 1 && timeDifference <= MS_IN_DAY * 3 && timeDifference > 0;
};

export const convertToISODate = (date: Date) => {
  const copyDate = new Date(date);
  const timestampWithTimezone = copyDate.getTime() - copyDate.getTimezoneOffset() * 60000;
  const correctedDate = new Date(timestampWithTimezone);

  return correctedDate.toISOString();
};

export const isTodayLaterThanDate = (dateString: string, differenceInHours = 24) => {
  const date = new Date(dateString);
  const now = new Date(convertToISODate(new Date()));
  const MS_IN_HOUR = 60 * 60 * 1000;

  return Number(now) - Number(date) > differenceInHours * MS_IN_HOUR;
};

export const getAllMonthSundays = ({ month, year }: { month: number; year: number }) => {
  const firstMonthDate = 1;
  const lastMonthDate = new Date(year, month + 1, 0).getDate();

  const rawFirstMonthDayOfWeek = new Date(year, month, firstMonthDate).getDay();
  const firstMonthDayOfWeek = rawFirstMonthDayOfWeek === 0 ? 7 : rawFirstMonthDayOfWeek;

  const firstMonthSundayDate = CALENDAR.daysInWeek - firstMonthDayOfWeek + 1;

  const sundayDates: Date[] = [];
  let i = 0;
  let currentSundayMonth = month;

  while (currentSundayMonth === month) {
    const currentSundayDate = new Date(year, month, firstMonthSundayDate + i);

    sundayDates.push(currentSundayDate);
    i += CALENDAR.daysInWeek;

    if (currentSundayDate.getDate() === lastMonthDate) {
      break;
    }

    currentSundayMonth = currentSundayDate.getMonth();
  }

  return sundayDates;
};

export const getDatesOfWeek = (sunday: Date) =>
  new Array(CALENDAR.daysInWeek).fill(0).map((item, index) => {
    const dayOfWeek = sunday.getDate() - CALENDAR.daysInWeek + (index + 1);

    return new Date(new Date(sunday).setDate(dayOfWeek));
  });
