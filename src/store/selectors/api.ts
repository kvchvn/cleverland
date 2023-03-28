import { useSelector } from 'react-redux';

import { BookBase, Category, QueryStatus } from '../../types';
import api from '../slices/api/libraryApi';
import { RootState } from '../store';

export const useCategoriesSelector = () =>
  useSelector(
    (state: RootState) => state[api.reducerPath].queries['getCategories(undefined)']?.data as Category[] | undefined
  );

export const useCategoriesStatusSelector = () =>
  useSelector((state: RootState) => state[api.reducerPath].queries['getCategories(undefined)']?.status as QueryStatus);

export const useAllBooksSelector = () =>
  useSelector(
    (state: RootState) => state[api.reducerPath].queries['getAllBooks(undefined)']?.data as BookBase[] | undefined
  );

export const useAllBooksStatusSelector = () =>
  useSelector((state: RootState) => state[api.reducerPath].queries['getAllBooks(undefined)']?.status as QueryStatus);
