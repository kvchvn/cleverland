import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookBase, BookModified, Nullable } from '../../types';

type BookingInitialState = {
  bookingDateISO: Nullable<string>;
  book: Nullable<BookBase | BookModified>;
};

const initialState: BookingInitialState = {
  bookingDateISO: null,
  book: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDate: (state, { payload }: PayloadAction<string>) => {
      state.bookingDateISO = payload;
    },
    setBookForBooking: (state, { payload }: PayloadAction<BookBase | BookModified>) => {
      state.book = payload;
    },
    resetBooking: (state) => {
      state.bookingDateISO = null;
      state.book = null;
    },
  },
});

export default bookingSlice.reducer;
export const { setBookingDate, resetBooking, setBookForBooking } = bookingSlice.actions;
