import React from 'react';

import { BooksControlPanel } from '../books-control-panel';
import { BooksList } from '../books-list';

import styles from './Books.module.scss';

export const Books = () => (
  <section className={styles['books-section']}>
    <BooksControlPanel />
    <BooksList />
  </section>
);
