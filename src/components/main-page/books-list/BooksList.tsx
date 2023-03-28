import React from 'react';

import { useFilterAndSortBooks } from '../../../hooks';
import { useAllBooksSelector, useSearchValueSelector, useSortingByRatingSelector } from '../../../store';
import { FilteredBooksList } from '../filtered-books-list';

import styles from './BooksList.module.scss';

export const BooksList = () => {
  const books = useAllBooksSelector();
  const searchValue = useSearchValueSelector();
  const sortingByRating = useSortingByRatingSelector();

  const { filteredAndSortedBooks } = useFilterAndSortBooks({
    books,
    search: searchValue,
    sorting: sortingByRating,
  });

  return filteredAndSortedBooks ? (
    <div className={styles.books_container}>
      {filteredAndSortedBooks.length ? (
        <FilteredBooksList books={filteredAndSortedBooks} />
      ) : (
        <h3 data-test-id={searchValue ? 'search-result-not-found' : 'empty-category'}>
          {searchValue ? 'По запросу ничего не найдено' : 'В этой категории книг ещё нет'}
        </h3>
      )}
    </div>
  ) : null;
};
