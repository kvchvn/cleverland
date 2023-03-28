import { useSelector } from 'react-redux';

import { BooksView } from '../../types';
import { RootState } from '../store';

export const useBooksViewSelector = (): BooksView => useSelector((state: RootState) => state.layout.booksView);

export const useBookCategoriesVisibilitySelector = (): boolean =>
  useSelector((state: RootState) => state.layout.isBookCategoriesVisible);

export const useAppNavVisibilitySelector = (): boolean =>
  useSelector((state: RootState) => state.layout.isAppNavVisible);
