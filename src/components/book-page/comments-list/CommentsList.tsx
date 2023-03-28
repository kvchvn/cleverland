import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';

import { PARAMS } from '../../../constants';
import { useFeedback } from '../../../hooks';
import { useUserSelector } from '../../../store';
import { BookComment, ModalWrapperType, Nullable } from '../../../types';
import { DropdownButton } from '../../common/dropdown-button';
import { Loading } from '../../global/loading';
import { ModalWrapper } from '../../global/modal-wrapper';
import { Toast } from '../../global/toast';
import { FeedbackAddition } from '../../modals/feedback-addition';
import { Comment } from '../comment';

import styles from './CommentsList.module.scss';

type CommentsListProps = {
  comments?: Nullable<BookComment[]>;
};

export const CommentsList = ({ comments }: CommentsListProps) => {
  const [areCommentsVisible, setAreCommentsVisible] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const user = useUserSelector();

  const { bookId } = useParams<typeof PARAMS>();

  const isUserCommentExisting = Boolean(user && comments?.find((comment) => comment.user.commentUserId === user.id));

  const complexStyles = {
    button: classnames(styles['comments-list__button'], { [styles.button_edit]: isUserCommentExisting }),
    comments: classnames(styles['comments-list__box'], { [styles.comments_hidden]: !areCommentsVisible }),
  };

  const closeModal = useCallback(() => setIsModalOpened(false), []);
  const openModal = () => setIsModalOpened(true);

  const {
    actions,
    status: { isLoading, isError, isSuccess, actionName },
  } = useFeedback({ effect: closeModal });

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal();
  };

  const toggleCommentsVisibility = () => setAreCommentsVisible((prevState) => !prevState);

  const descendingSortByDate = (someComments: BookComment[]) =>
    [...someComments].sort((comment1, comment2) => Date.parse(comment2.createdAt) - Date.parse(comment1.createdAt));

  return (
    <>
      {isLoading ? <Loading /> : <Toast success={isSuccess} error={isError} actionName={actionName} />}
      {isModalOpened && bookId && (
        <ModalWrapper closeFn={closeModal} isOpened={isModalOpened} type={ModalWrapperType.Feedback}>
          <FeedbackAddition actions={actions} bookId={bookId} />
        </ModalWrapper>
      )}
      <h5>
        Отзывы <span>{comments?.length || 0}</span>
        {comments?.length && (
          <DropdownButton
            isDropped={areCommentsVisible}
            toggleFn={toggleCommentsVisibility}
            dataTestId='button-hide-reviews'
          />
        )}
      </h5>
      {comments?.length && (
        <ul className={complexStyles.comments}>
          {descendingSortByDate(comments).map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
      <button type='button' onClick={handleOpenModal} className={complexStyles.button} data-test-id='button-rate-book'>
        {isUserCommentExisting ? 'Изменить оценку' : 'Оценить книгу'}
      </button>
    </>
  );
};
