import React, { useCallback, useEffect, useState } from 'react';

import { MAX_RATING } from '../../../constants';
import { isBookBaseType } from '../../../helpers';
import { useGetBookByIdQuery, useUserSelector } from '../../../store';
import { AddFeedbackRequestBody, Nullable } from '../../../types';
import { RatingStars } from '../../common/rating-stars';
import { Loading } from '../../global/loading';
import { Toast } from '../../global/toast';

import styles from './FeedbackAddition.module.scss';

type FeedbackAdditionProps = {
  actions: {
    addFeedback: ({ data }: AddFeedbackRequestBody) => void;
    updateFeedback: ({ data, commentId }: { data: AddFeedbackRequestBody['data']; commentId: string }) => void;
  };
  bookId: string;
};

type FeedbackAdditionState = {
  rating: number;
  text: string;
  commentId: Nullable<string>;
};

export const FeedbackAddition = ({ actions, bookId }: FeedbackAdditionProps) => {
  const [state, setState] = useState<FeedbackAdditionState>({
    rating: MAX_RATING,
    text: '',
    commentId: null,
  });

  const { isLoading, isError, isSuccess, data: book } = useGetBookByIdQuery(bookId);

  const user = useUserSelector();

  const handleChangeRating = useCallback(
    (newRating: number) => setState((prevState) => ({ ...prevState, rating: newRating })),
    []
  );

  const handleChangeTextarea = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;

    setState((prevState) => ({ ...prevState, text: target.value }));
  };

  const handleClick = async () => {
    if (bookId && user) {
      try {
        const data: AddFeedbackRequestBody['data'] = {
          rating: state.rating,
          text: state.text,
          book: bookId,
          user: String(user.id),
        };

        if (state.commentId) {
          actions.updateFeedback({ data, commentId: state.commentId });
        } else {
          actions.addFeedback({ data });
        }
      } catch (err) {
        console.error('Error with feedback addition(editing)! ', err);
      }
    }
  };

  useEffect(() => {
    if (isSuccess && user && !isBookBaseType(book) && book.comments) {
      const commentLeftByUser = book.comments.find((comment) => comment.user.commentUserId === user.id);

      if (commentLeftByUser) {
        setState((prevState) => ({
          ...prevState,
          rating: commentLeftByUser.rating,
          text: commentLeftByUser.text ? commentLeftByUser.text : '',
          commentId: String(commentLeftByUser.id),
        }));
      }
    }
  }, [isSuccess, user, book]);

  return (
    <>
      {isLoading ? <Loading /> : <Toast error={isError} />}
      <div className={styles.box}>
        <h4 data-test-id='modal-title'>Оцените книгу</h4>
        <article className={styles.article}>
          <p>Ваша оценка</p>
          <ul data-test-id='rating'>
            <RatingStars rating={state.rating} canBeChanged={true} changeFn={handleChangeRating} />
          </ul>
        </article>
        <textarea
          name='feedback-text'
          placeholder='Оставить отзыв'
          value={state.text}
          onChange={handleChangeTextarea}
          className={styles.textarea}
          data-test-id='comment'
        />
        <button type='button' onClick={handleClick} className={styles.button} data-test-id='button-comment'>
          {state.commentId ? 'Изменить оценку' : 'Оценить'}
        </button>
      </div>
    </>
  );
};
