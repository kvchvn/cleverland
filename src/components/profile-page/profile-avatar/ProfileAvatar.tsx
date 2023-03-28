import React from 'react';

import default_avatar from '../../../assets/svg/default_avatar.svg';
import { useUploadAvatar } from '../../../hooks';
import { useUserSelector } from '../../../store';
import { ToastActions } from '../../../types';
import { ProgressiveImage } from '../../common/progressive-image';
import { Loading } from '../../global/loading';
import { Toast } from '../../global/toast';

import styles from './ProfileAvatart.module.scss';

export const ProfileAvatar = () => {
  const user = useUserSelector();

  const {
    handleChange,
    status: { isLoading, isError, isSuccess },
  } = useUploadAvatar({ user });

  return (
    <>
      {isLoading ? <Loading /> : <Toast success={isSuccess} error={isError} actionName={ToastActions.UploadAvatar} />}
      <label htmlFor='file' className={styles['avatar-box']}>
        <ProgressiveImage src={user?.avatar} defaultSrc={default_avatar} alt='Ваш аватар' />
        <span />
        <input type='file' id='file' onChange={handleChange} />
      </label>
    </>
  );
};
