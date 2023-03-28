import { BookBase, RequestError } from '../types';

export const isRequestError = (err: unknown): err is RequestError =>
  typeof err === 'object' &&
  err !== null &&
  'data' in err &&
  'error' in err &&
  typeof err.error === 'object' &&
  err.error !== null &&
  'status' in err.error &&
  typeof err.error.status === 'number';

export const isBookBaseType = (book: unknown): book is BookBase =>
  typeof book === 'object' &&
  book !== null &&
  'booking' in book &&
  'delivery' in book &&
  'histories' in book &&
  'id' in book &&
  'title' in book &&
  !('images' in book) &&
  !('description' in book);
