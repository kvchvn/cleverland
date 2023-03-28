import { createSlice } from '@reduxjs/toolkit';

import { BOOKS_LIST_VIEW, BOOKS_TABLE_VIEW } from '../../constants';
import { BooksView } from '../../types';

type LayoutSliceInitialState = {
  booksView: BooksView;
  isBookCategoriesVisible: boolean;
  isAppNavVisible: boolean;
};

const initialState: LayoutSliceInitialState = {
  booksView: BOOKS_TABLE_VIEW,
  isBookCategoriesVisible: true,
  isAppNavVisible: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleBooksView: (state) => {
      if (state.booksView === BOOKS_TABLE_VIEW) {
        state.booksView = BOOKS_LIST_VIEW;
      } else {
        state.booksView = BOOKS_TABLE_VIEW;
      }
    },
    toggleBookCategoriesVisibility: (state) => {
      state.isBookCategoriesVisible = !state.isBookCategoriesVisible;
    },
    hideBookCategories: (state) => {
      state.isBookCategoriesVisible = false;
    },
    toggleAppNavVisibility: (state) => {
      state.isAppNavVisible = !state.isAppNavVisible;
    },
    hideAppNav: (state) => {
      state.isAppNavVisible = false;
    },
  },
});

export default layoutSlice.reducer;
export const {
  toggleBooksView,
  toggleBookCategoriesVisibility,
  hideBookCategories,
  toggleAppNavVisibility,
  hideAppNav,
} = layoutSlice.actions;
