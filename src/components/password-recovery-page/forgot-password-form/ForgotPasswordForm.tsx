import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { FORGOT_PASSWORD_FIELDS, FORGOT_PASSWORD_SUCCESS_MODAL, ROUTES, VALIDATION_ERRORS } from '../../../constants';
import { check } from '../../../helpers';
import { useSendLinkToRecoveryPasswordMutation } from '../../../store';
import { ForgotPassRequestBody } from '../../../types';
import { AuthModal } from '../../common/auth-modal';
import { InputBox } from '../../common/input-box';
import { Loading } from '../../global/loading';

import styles from './ForgotPasswordForm.module.scss';

export const ForgotPasswordForm = () => {
  const {
    handleSubmit: handleSubmitWrapper,
    control,
    formState: { isValid: isFormValid, submitCount, touchedFields },
  } = useForm<ForgotPassRequestBody>({ mode: 'all', shouldFocusError: false });
  const [sendLinkToRecoveryPassword, { isLoading, isSuccess, isError }] = useSendLinkToRecoveryPasswordMutation();

  const handleSubmit = handleSubmitWrapper((formValues) => {
    sendLinkToRecoveryPassword(formValues);
  });

  if (isSuccess) {
    return (
      <AuthModal title={FORGOT_PASSWORD_SUCCESS_MODAL.title} description={FORGOT_PASSWORD_SUCCESS_MODAL.description} />
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles['forgot-pass-form__link-back-box']}>
        <Link to={ROUTES.auth}>Вход в личный кабинет</Link>
      </div>
      <h4 className={styles['forgot-pass-form__heading']}>Восстановление пароля</h4>
      <form
        autoComplete='off'
        onSubmit={handleSubmit}
        className={styles['forgot-pass-form']}
        data-test-id='send-email-form'
      >
        <div>
          <InputBox
            type='email'
            name={FORGOT_PASSWORD_FIELDS.email.name}
            label={FORGOT_PASSWORD_FIELDS.email.label}
            control={control}
            validationRules={{
              validate: {
                isValidEmail: (val) => check(val).hasValidEmail || VALIDATION_ERRORS.invalidEmail,
              },
              required: VALIDATION_ERRORS.requiredField,
            }}
            isFormError={isError}
          />
          <p className={styles['forgot-pass-form__error-text']} data-test-id='hint'>
            {isError && 'error'}
          </p>
          <p className={styles['forgot-pass-form__assistive-text']}>
            На это email будет отправлено письмо с инструкциями по восстановлению пароля
          </p>
        </div>
        <div className={styles['forgot-pass-form__submit-box']}>
          <button
            type='submit'
            disabled={!isFormValid && (Boolean(Object.keys(touchedFields).length) || submitCount > 0)}
          >
            Восстановить
          </button>
          <p>
            Нет учетной записи?
            <Link to={ROUTES.registration}>Регистрация</Link>
          </p>
        </div>
      </form>
    </>
  );
};
