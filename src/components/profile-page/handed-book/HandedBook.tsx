import React from 'react';

import { BOOKS_LIST_VIEW } from '../../../constants';
import { formatDate, isTodayLaterThanDate } from '../../../helpers';
import { EmptyContainerType, UserDelivery } from '../../../types';
import { EmptyContainer } from '../../common/empty-container';
import { BookCard } from '../../main-page/book-card';

import styles from './HandedBook.module.scss';

type HandedBookProps = {
  delivery: UserDelivery;
};

export const HandedBook = ({ delivery }: HandedBookProps) =>
  delivery.book ? (
    <ul className={styles['handed-book__container']}>
      <BookCard book={delivery.book} view={BOOKS_LIST_VIEW}>
        <div className={styles['handed-book__date']}>
          <p>
            {delivery.dateHandedTo &&
              `Возврат ${formatDate({
                date: delivery.dateHandedTo,
                mode: 'short',
              })}`}
          </p>
        </div>
      </BookCard>
      {delivery?.dateHandedTo && isTodayLaterThanDate(delivery.dateHandedTo) && (
        <EmptyContainer type={EmptyContainerType.Warning} dataTestId='expired'>
          <h3>
            Вышел срок <br /> пользования книги
          </h3>
          <p>Верните книгу, пожалуйста</p>
        </EmptyContainer>
      )}
    </ul>
  ) : (
    <EmptyContainer dataTestId='empty-blue-card'>
      <h3>
        Прочитав книгу, <br />
        она отобразится в истории
      </h3>
    </EmptyContainer>
  );
