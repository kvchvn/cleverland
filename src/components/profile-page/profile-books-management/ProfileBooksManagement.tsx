import React from 'react';

import { useUserSelector } from '../../../store';
import { BookedBook } from '../booked-book';
import { BooksHistory } from '../books-history';
import { HandedBook } from '../handed-book';

import styles from './ProfileBooksManagement.module.scss';

export const ProfileBooksManagement = () => {
  const user = useUserSelector();

  return user ? (
    <ul className={styles['books-management__container']}>
      <li>
        <h4>Забронированная книга</h4>
        <p>Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь</p>
        <BookedBook booking={user.booking} />
      </li>
      <li>
        <h4>Книга которую взяли</h4>
        <p>Здесь можете просмотреть информацию о книге и узнать сроки возврата</p>
        <HandedBook delivery={user.delivery} />
      </li>
      <li data-test-id='history'>
        <h4>История</h4>
        <p>Список прочитанных книг</p>
        <BooksHistory books={user.history.books} />
      </li>
    </ul>
  ) : null;
};
