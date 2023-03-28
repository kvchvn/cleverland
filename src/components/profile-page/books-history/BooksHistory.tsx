import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BOOKS_TABLE_VIEW } from '../../../constants';
import { useFeedback } from '../../../hooks';
import { useUserSelector } from '../../../store';
import { ModalWrapperType, Nullable, UserBook, UserComment } from '../../../types';
import { EmptyContainer } from '../../common/empty-container';
import { Loading } from '../../global/loading';
import { ModalWrapper } from '../../global/modal-wrapper';
import { Toast } from '../../global/toast';
import { BookCard } from '../../main-page/book-card';
import { FeedbackAddition } from '../../modals/feedback-addition';

import './swiper.scss';
import styles from './BooksHistory.module.scss';

type BooksHistoryProps = {
  books: Nullable<UserBook[]>;
};

type BooksHistoryState = {
  isModalOpened: boolean;
  currentBookId: Nullable<string>;
};

export const BooksHistory = ({ books }: BooksHistoryProps) => {
  const [state, setState] = useState<BooksHistoryState>({
    isModalOpened: false,
    currentBookId: null,
  });
  const user = useUserSelector();

  const closeModal = useCallback(
    () => setState((prevState) => ({ ...prevState, isModalOpened: false, currentBookId: null })),
    []
  );

  const openModal = ({ e, bookId }: { e: React.MouseEvent; bookId: string }) => {
    e.stopPropagation();
    setState((prevState) => ({ ...prevState, isModalOpened: true, currentBookId: bookId }));
  };

  const {
    actions,
    status: { isLoading, isError, isSuccess, actionName },
  } = useFeedback({ effect: closeModal });

  const userCommentOnBook = (book: UserBook): UserComment | undefined =>
    user?.comments.find((comment) => comment.bookId === book.id);

  return books?.length ? (
    <>
      {isLoading ? <Loading /> : <Toast success={isSuccess} error={isError} actionName={actionName} />}
      {state.isModalOpened && state.currentBookId && (
        <ModalWrapper isOpened={state.isModalOpened} closeFn={closeModal} type={ModalWrapperType.Feedback}>
          <FeedbackAddition actions={actions} bookId={state.currentBookId} />
        </ModalWrapper>
      )}
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 8 }}
        breakpoints={{
          1000: { slidesPerView: 4, spaceBetween: 20 },
          760: { slidesPerView: 3, spaceBetween: 20 },
          600: { slidesPerView: 2, spaceBetween: 20 },
        }}
        className={styles.slider}
      >
        {books.map((book, index) => (
          <SwiperSlide key={book.id} virtualIndex={index} className={styles.slider__slide} data-test-id='history-slide'>
            <ul className={styles['books-history__book-container']}>
              <BookCard book={book} view={BOOKS_TABLE_VIEW}>
                <button
                  type='button'
                  onClick={(e) => openModal({ e, bookId: String(book.id) })}
                  className={classnames(styles.button, { [styles.button_edit]: userCommentOnBook(book) })}
                  data-test-id='history-review-button'
                >
                  {userCommentOnBook(book) ? 'Изменить оценку' : 'Оставить отзыв'}
                </button>
              </BookCard>
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  ) : (
    <EmptyContainer dataTestId='empty-blue-card'>
      <h3>
        Вы не читали книг <br />
        из нашей библиотеки
      </h3>
    </EmptyContainer>
  );
};
