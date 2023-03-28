import { BOOKS_LIST_VIEW, BOOKS_TABLE_VIEW } from '../constants';

export type BooksView = typeof BOOKS_TABLE_VIEW | typeof BOOKS_LIST_VIEW;

// jwt has been already saved in cookies
export type LocalStorageKey = 'jwt';

export type Nullable<T> = T | null;

export enum EmptyContainerType {
  Base = 'base',
  Warning = 'warning',
}

export enum ModalWrapperType {
  Booking = 'booking',
  Feedback = 'feedback',
}

export enum ToastActions {
  AddFeedback = 'addFeedback',
  UpdateFeedback = 'updateFeedback',
  SetBooking = 'setBooking',
  UpdateBooking = 'updateBooking',
  ResetBooking = 'resetBooking',
  UploadAvatar = 'uploadAvatar',
  UpdateProfile = 'updateProfile',
  Default = 'default',
}

export type ToastMessages = {
  [P in ToastActions]: {
    success: string;
    error: string;
  };
};
