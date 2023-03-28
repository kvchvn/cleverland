import { useSelector } from 'react-redux';

import { SORT } from '../../constants';
import { RootState } from '../store';

export const useSortingByRatingSelector = (): typeof SORT.asc | typeof SORT.desc =>
  useSelector((state: RootState) => state.books.sortingBy.rating);

export const useIsSearchEmptySelector = (): boolean => useSelector((state: RootState) => state.books.search.isEmpty);

export const useSearchValueSelector = (): string => useSelector((state: RootState) => state.books.search.value);
