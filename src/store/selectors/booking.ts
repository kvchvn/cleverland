import { useSelector } from 'react-redux';

import { BookBase, BookModified, Nullable } from '../../types';
import { RootState } from '../store';

export const useBookingDateISOSelector = (): Nullable<string> =>
  useSelector((state: RootState) => state.booking.bookingDateISO);

export const useBookForBookingSelector = (): Nullable<BookBase | BookModified> =>
  useSelector((state: RootState) => state.booking.book);
