import { ToastMessages } from '../types';

export const MAX_RATING = 5;

export const SORT = {
  asc: 'asc',
  desc: 'desc',
};

export const INITIAL_SORT_BY_RATING = SORT.desc;

export const BOOKS_TABLE_VIEW = 'table';
export const BOOKS_LIST_VIEW = 'list';

export const TOAST_MESSAGES: ToastMessages = {
  addFeedback: {
    success: 'Спасибо, что нашли время оценить книгу!',
    error: 'Оценка не была отправлена. Попробуйте позже!',
  },
  updateFeedback: {
    success: 'Спасибо, что нашли время изменить оценку!',
    error: 'Изменения не были сохранены. Попробуйте позже!',
  },
  setBooking: {
    success: 'Книга забронирована. Подробности можно посмотреть на странице Профиль',
    error: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
  },
  updateBooking: {
    success: 'Изменения успешно сохранены!',
    error: 'Изменения не были сохранены. Попробуйте позже!',
  },
  resetBooking: {
    success: 'Бронирование книги успешно отменено!',
    error: 'Не удалось снять бронирование книги. Попробуйте позже!',
  },
  uploadAvatar: {
    success: 'Фото успешно сохранено!',
    error: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!',
  },
  updateProfile: {
    success: 'Изменения успешно сохранены!',
    error: 'Изменения не были сохранены. Попробуйте позже!',
  },
  default: {
    success: 'Действие выполнено успешно!',
    error: 'Что-то пошло не так. Обновите страницу через некоторое время.',
  },
};

export const MS_IN_DAY = 86400000;

export const CALENDAR = {
  daysInWeek: 7,
  lastDayOfWeekIndex: 7,
  firstMonthIndex: 0,
  lastMonthIndex: 11,
  labels: {
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
  },
};
