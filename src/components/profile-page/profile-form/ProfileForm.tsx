import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateUserMutation, useUserSelector } from '../../../store';
import { ProfileEditingForm, ToastActions } from '../../../types';
import { Loading } from '../../global/loading';
import { Toast } from '../../global/toast';
import { ProfileFormInputs } from '../profile-form-inputs';

import styles from './ProfileForm.module.scss';

export const ProfileForm = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const user = useUserSelector();

  const {
    control,
    handleSubmit: handleSubmitWrapper,
    clearErrors,
    reset: resetForm,
  } = useForm<ProfileEditingForm>({
    mode: 'all',
    defaultValues: {
      login: user?.username || '',
      password: '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      email: user?.email || '',
    },
  });

  const [updateUser, { isLoading, isError, isSuccess }] = useUpdateUserMutation();

  const toggleFormDisability = () => {
    if (!isFormDisabled) {
      resetForm();
      clearErrors();
    }
    setIsFormDisabled((prevState) => !prevState);
  };

  const handleSubmit = handleSubmitWrapper((formValues) => {
    if (user) {
      const { login, ...restFormValues } = formValues;

      updateUser({ username: login, ...restFormValues, userId: user.id });
      setIsFormDisabled(true);
    }
  });

  return (
    <>
      {isLoading ? <Loading /> : <Toast success={isSuccess} error={isError} actionName={ToastActions.UpdateProfile} />}
      <div className={styles['profile-form__container']}>
        <article className={styles['profile-form__heading']}>
          <h4>Учётные данные</h4>
          <p>Здесь вы можете отредактировать информацию о себе</p>
        </article>
        <form autoComplete='off' onSubmit={handleSubmit} className={styles['profile-form']} data-test-id='profile-form'>
          <ProfileFormInputs control={control} isFormDisabled={isFormDisabled} />
          <div className={styles['profile-form__buttons-box']}>
            <button
              type='button'
              onClick={toggleFormDisability}
              className={styles.button_edit}
              data-test-id='edit-button'
            >
              {isFormDisabled ? 'Редактировать' : 'Отменить'}
            </button>
            <button type='submit' disabled={isFormDisabled} className={styles.button_save} data-test-id='save-button'>
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
