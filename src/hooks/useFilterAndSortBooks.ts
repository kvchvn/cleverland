import { useParams } from 'react-router-dom';

import { ALL_BOOKS_CATEGORY, PARAMS, SORT } from '../constants';
import { useCategoriesSelector } from '../store';
import { BookBase } from '../types';

type UseFilterAndSortBooksArgs = {
  search: string;
  sorting: string;
  books?: BookBase[];
};

export const useFilterAndSortBooks = ({ books, search, sorting }: UseFilterAndSortBooksArgs) => {
  const { category: currentCategoryPath } = useParams<keyof typeof PARAMS>();
  const categories = useCategoriesSelector();

  const filteredAndSortedBooks = books
    ? books
        .filter((book) => {
          // checking by categories (more important)
          if (book.categories && categories && currentCategoryPath && currentCategoryPath !== ALL_BOOKS_CATEGORY.path) {
            const currentCategory = categories.find((cat) => cat.path === currentCategoryPath);

            if (currentCategory && !book.categories.includes(currentCategory.name)) {
              return false;
            }
          }

          // checking by search-input (less important)
          if (search && !book.title.toLowerCase().includes(search.toLowerCase().trim())) {
            return false;
          }

          return true;
        })
        .sort((bookA, bookB) => {
          const DEFAULT_RATING = 0;
          const bookARating = bookA.rating || DEFAULT_RATING;
          const bookBRating = bookB.rating || DEFAULT_RATING;

          switch (sorting) {
            case SORT.asc:
              return bookARating - bookBRating;
            case SORT.desc:
            default:
              return bookBRating - bookARating;
          }
        })
    : undefined;

  return { filteredAndSortedBooks };
};
