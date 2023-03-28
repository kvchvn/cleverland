import React from 'react';

import { NotFoundView } from '../../components/common/not-found-view';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <main className={styles['not-found-page__main']}>
    <NotFoundView />
  </main>
);
