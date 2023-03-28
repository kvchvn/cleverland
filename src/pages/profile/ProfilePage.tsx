import React, { useEffect } from 'react';

import { Loading } from '../../components/global/loading';
import { Toast } from '../../components/global/toast';
import { Wrapper } from '../../components/global/wrapper';
import { AppNavigation } from '../../components/navigation/app-navigation';
import { ProfileContent } from '../../components/profile-page/profile-content';
import { useGetAllBooksQuery, useGetCategoriesQuery, useGetUserQuery } from '../../store';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const { isFetching, isSuccess, isError, refetch: refetchUser } = useGetUserQuery();

  useGetAllBooksQuery();
  useGetCategoriesQuery();

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  return (
    <>
      {isFetching ? <Loading /> : <Toast error={isError} />}
      <main className={styles['profile-page__main']}>
        <Wrapper>
          <AppNavigation />
          {isSuccess && <ProfileContent />}
        </Wrapper>
      </main>
    </>
  );
};
