import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_SORT_BY_RATING, SORT } from '../../constants';

type BooksSliceInitialState = {
  sortingBy: {
    rating: typeof SORT.asc | typeof SORT.desc;
  };
  search: {
    isEmpty: boolean;
    value: string;
  };
};

const initialState: BooksSliceInitialState = {
  sortingBy: {
    rating: INITIAL_SORT_BY_RATING,
  },
  search: {
    isEmpty: true,
    value: '',
  },
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    toggleSortingByRating: (state) => {
      if (state.sortingBy.rating === SORT.desc) {
        state.sortingBy.rating = SORT.asc;
      } else {
        state.sortingBy.rating = SORT.desc;
      }
    },
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.search.isEmpty = !payload;
      state.search.value = payload;
    },
  },
});

export default booksSlice.reducer;
export const { toggleSortingByRating, setSearchValue } = booksSlice.actions;
