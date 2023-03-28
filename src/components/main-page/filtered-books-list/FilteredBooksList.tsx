import React, { useCallback, useState } from 'react';
import classnames from 'classnames';

import { useBooking } from '../../../hooks';
import { resetBooking, setBookForBooking, setBookingDate, useBooksViewSelector } from '../../../store';
import { useAppDispatch } from '../../../store/store';
import { BookBase, ModalWrapperType } from '../../../types';
import { Loading } from '../../global/loading';
import { ModalWrapper } from '../../global/modal-wrapper';
import { Toast } from '../../global/toast';
import { Booking } from '../../modals/booking';
import { BookCard } from '../book-card';

import styles from './FilteredBooksList.module.scss';

type FilteredBooksListProps = {
  books: BookBase[];
};

export const FilteredBooksList = ({ books }: FilteredBooksListProps) => {
  const [isBookingModalOpened, setIsBookingModalOpened] = useState(false);
  const booksView = useBooksViewSelector();
  const dispatch = useAppDispatch();

  const complexStyles = {
    booksList: classnames(styles['books-list'], styles[`${booksView}-view`]),
  };

  const closeModal = useCallback(() => {
    setIsBookingModalOpened(false);
    dispatch(resetBooking());
  }, [dispatch]);

  const openModal = useCallback(
    (book: BookBase) => {
      setIsBookingModalOpened(true);
      dispatch(setBookForBooking(book));

      if (book.booking?.dateOrder) {
        dispatch(setBookingDate(book.booking.dateOrder));
      }
    },
    [dispatch]
  );

  const {
    actions,
    status: { isLoading, isError, isSuccess, actionName },
  } = useBooking({ effect: closeModal });

  return (
    <>
      {isLoading ? <Loading /> : <Toast success={isSuccess} error={isError} actionName={actionName} />}
      {isBookingModalOpened && (
        <ModalWrapper isOpened={isBookingModalOpened} closeFn={closeModal} type={ModalWrapperType.Booking}>
          <Booking actions={actions} />
        </ModalWrapper>
      )}
      <ul className={complexStyles.booksList} data-test-id='content'>
        {books.map((book) => (
          <BookCard key={book.id} view={booksView} book={book} openBookingModalFn={openModal} />
        ))}
      </ul>
    </>
  );
};
