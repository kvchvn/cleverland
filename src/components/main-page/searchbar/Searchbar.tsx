import React, { Dispatch, memo, SetStateAction, useCallback, useState } from 'react';
import classnames from 'classnames';

import { useDebounce } from '../../../hooks';
import { setSearchValue, useSearchValueSelector } from '../../../store';
import { useAppDispatch } from '../../../store/store';

import styles from './Searchbar.module.scss';

type SearchbarProps = {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

export const Searchbar = memo(({ isExpanded, setIsExpanded }: SearchbarProps) => {
  const searchValue = useSearchValueSelector();
  const [value, setValue] = useState(searchValue);
  const dispatch = useAppDispatch();

  const complexStyles = {
    searchBox: classnames(styles['search-box'], { [styles.search_expanded]: isExpanded }),
  };

  const handleExpandSearch = () => setIsExpanded(true);

  const handleHideSearch = () => setIsExpanded(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const callback = useCallback(() => dispatch(setSearchValue(value)), [value, dispatch]);

  useDebounce(callback);

  return (
    <label htmlFor='search' className={complexStyles.searchBox} data-test-id='button-search-open'>
      <input
        type='search'
        id='search'
        placeholder='Поиск книги или автора…'
        onClick={handleExpandSearch}
        value={value}
        onChange={handleChange}
        data-test-id='input-search'
      />
      <button type='button' onClick={handleHideSearch} data-test-id='button-search-close' />
    </label>
  );
});

Searchbar.displayName = 'SearchBox';
