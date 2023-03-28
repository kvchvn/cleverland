import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { NotFoundView } from '../../components/common/not-found-view';
import { Loading } from '../../components/global/loading';
import { Toast } from '../../components/global/toast';
import { Wrapper } from '../../components/global/wrapper';
import { Books } from '../../components/main-page/books';
import { AppNavigation } from '../../components/navigation/app-navigation';
import { PARAMS, QUERY_STATUSES } from '../../constants';
import { useCategoriesSelector, useCategoriesStatusSelector, useGetAllBooksQuery } from '../../store';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const params = useParams<keyof typeof PARAMS>();
  const {
    isSuccess: isAllBooksSuccess,
    isError: isAllBooksError,
    isFetching: isAllBooksFetching,
    refetch: refetchAllBooks,
  } = useGetAllBooksQuery();

  const categoriesStatus = useCategoriesStatusSelector();
  const categories = useCategoriesSelector();

  const isLoading = categoriesStatus === QUERY_STATUSES.isLoading || isAllBooksFetching;
  const isError = categoriesStatus === QUERY_STATUSES.isError || isAllBooksError;
  const isSuccess = categoriesStatus === QUERY_STATUSES.isSuccess && isAllBooksSuccess;

  const isUnknownCategory = categories
    ? params.category && !categories.find((category) => category.path === params.category)
    : false;

  useEffect(() => {
    // to refetch on every render
    refetchAllBooks();
  }, [refetchAllBooks]);

  return (
    <>
      {isLoading ? <Loading /> : <Toast error={isError} />}
      <main className={styles['main-page__main']} data-test-id='main-page'>
        {isUnknownCategory ? (
          <NotFoundView />
        ) : (
          <Wrapper>
            <AppNavigation />
            {isSuccess && <Books />}
          </Wrapper>
        )}
      </main>
    </>
  );
};
