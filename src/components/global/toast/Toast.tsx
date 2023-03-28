import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { TOAST_MESSAGES } from '../../../constants';
import { ToastActions } from '../../../types';
import { Wrapper } from '../wrapper';

import styles from './Toast.module.scss';

type ToastProps = {
  success?: boolean;
  error?: boolean;
  actionName?: ToastActions;
  autoCloseAfterMs?: number;
};

export const Toast = ({
  success = false,
  error = false,
  actionName = ToastActions.Default,
  autoCloseAfterMs = 4000,
}: ToastProps) => {
  const [isShowToast, setIsShowToast] = useState(success || error);

  const complexStyles = {
    contentContainer: classnames(styles['toast__content-container'], {
      [styles.toast_success]: success,
      [styles.toast_error]: error,
    }),
    content: classnames(styles.toast__content, {
      [styles.toast_success]: success,
      [styles.toast_error]: error,
    }),
  };

  const handleClick = () => setIsShowToast(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (autoCloseAfterMs) {
      timerId = setTimeout(handleClick, autoCloseAfterMs);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [autoCloseAfterMs]);

  return isShowToast ? (
    <section className={styles.toast__container}>
      <Wrapper>
        <div className={complexStyles.contentContainer} data-test-id='error'>
          <section className={complexStyles.content}>
            <span />
            <p>{success ? TOAST_MESSAGES[actionName].success : TOAST_MESSAGES[actionName].error}</p>
            <button type='button' onClick={handleClick} data-test-id='alert-close' />
          </section>
        </div>
      </Wrapper>
    </section>
  ) : null;
};
