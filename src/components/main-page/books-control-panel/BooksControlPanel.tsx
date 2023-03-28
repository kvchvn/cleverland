import React, { useState } from 'react';
import classnames from 'classnames';

import { BOOKS_LIST_VIEW, BOOKS_TABLE_VIEW, INITIAL_SORT_BY_RATING } from '../../../constants';
import {
  toggleBooksView,
  toggleSortingByRating,
  useBooksViewSelector,
  useSortingByRatingSelector,
} from '../../../store';
import { useAppDispatch } from '../../../store/store';
import { Searchbar } from '../searchbar';

import styles from './BooksControlPanel.module.scss';

export const BooksControlPanel = () => {
  const [isExpandedSearchbar, setIsExpandedSearchbar] = useState(false);
  const booksView = useBooksViewSelector();
  const sortingByRating = useSortingByRatingSelector();
  const dispatch = useAppDispatch();

  const complexStyles = {
    sortControls: classnames(styles['books-control-panel__sort-controls'], { [styles.hidden]: isExpandedSearchbar }),
    viewControls: classnames(styles['books-control-panel__view-controls'], { [styles.hidden]: isExpandedSearchbar }),
  };

  const handleToggleSorting = () => dispatch(toggleSortingByRating());

  const handleToggleView = () => dispatch(toggleBooksView());

  return (
    <nav className={styles['books-control-panel']}>
      <Searchbar isExpanded={isExpandedSearchbar} setIsExpanded={setIsExpandedSearchbar} />
      <label htmlFor='sort' className={complexStyles.sortControls} data-test-id='sort-rating-button'>
        По рейтингу
        <input
          type='checkbox'
          id='sort'
          checked={sortingByRating === INITIAL_SORT_BY_RATING}
          onChange={handleToggleSorting}
        />
      </label>
      <div className={complexStyles.viewControls}>
        <label htmlFor='table' data-test-id='button-menu-view-window'>
          <input
            type='radio'
            id='table'
            name='books-view'
            checked={booksView === BOOKS_TABLE_VIEW}
            onChange={handleToggleView}
          />
        </label>
        <label htmlFor='list' data-test-id='button-menu-view-list'>
          <input
            type='radio'
            id='list'
            name='books-view'
            checked={booksView === BOOKS_LIST_VIEW}
            onChange={handleToggleView}
          />
        </label>
      </div>
    </nav>
  );
};
