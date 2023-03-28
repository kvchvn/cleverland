import { combineReducers } from '@reduxjs/toolkit';

import libraryApi from './slices/api/libraryApi';
import bookingSlice from './slices/booking';
import booksSlice from './slices/books';
import layoutSlice from './slices/layout';
import userSlice from './slices/user';

export const rootReducer = combineReducers({
  layout: layoutSlice,
  books: booksSlice,
  user: userSlice,
  booking: bookingSlice,
  [libraryApi.reducerPath]: libraryApi.reducer,
});
