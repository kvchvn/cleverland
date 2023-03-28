import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { AUTH_FAILURE_MODAL, AUTHENTICATION_FIELDS, COOKIES, ROUTES, VALIDATION_ERRORS } from '../../../constants';
import { getRequestErrorStatusCode } from '../../../helpers';
import { useAuthenticationMutation } from '../../../store';
import { AuthRequestBody } from '../../../types';
import { AuthModal } from '../../common/auth-modal';
import { InputBox } from '../../common/input-box';
import { Loading } from '../../global/loading';

import styles from './AuthForm.module.scss';

export const AuthForm = () => {
  const navigate = useNavigate();

  const {
    control,
    formState: { isValid: isFormValid, submitCount },
    getValues: getFormValues,
    handleSubmit: handleSubmitWrapper,
  } = useForm<AuthRequestBody>({
    mode: 'all',
    shouldFocusError: false,
  });

  const [authenticate, { isLoading, isError, error }] = useAuthenticationMutation();

  const handleAuthentication = async (formValues: AuthRequestBody = getFormValues()) => {
    try {
      const response = await authenticate(formValues).unwrap();

      Cookies.set(COOKIES.jwt, response.jwt, { secure: true, sameSite: 'strict' });
      navigate(ROUTES.main);
    } catch (err) {
      console.error('Error with authentication!', err);
    }
  };

  const handleSubmit = handleSubmitWrapper(async (formValues) => {
    await handleAuthentication(formValues);
  });

  if (isError) {
    const statusCode = getRequestErrorStatusCode(error);

    // invalid login or/and password handling
    if (statusCode !== 400) {
      return (
        <>
          {isLoading && <Loading />}
          <AuthModal
            title={AUTH_FAILURE_MODAL.title}
            description={AUTH_FAILURE_MODAL.description}
            buttonText={AUTH_FAILURE_MODAL.buttonText}
            buttonAction={handleAuthentication}
          />
        </>
      );
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <h4>Вход в личный кабинет</h4>
      <form autoComplete='off' onSubmit={handleSubmit} className={styles['auth-form']} data-test-id='auth-form'>
        <ul className={styles['auth-form__inputs-list']}>
          <li>
            <InputBox
              type='text'
              name={AUTHENTICATION_FIELDS.identifier.name}
              label={AUTHENTICATION_FIELDS.identifier.label}
              control={control}
              validationRules={{ required: VALIDATION_ERRORS.requiredField }}
              isFormError={isError}
            />
          </li>
          <li>
            <InputBox
              type='password'
              name={AUTHENTICATION_FIELDS.password.name}
              label={AUTHENTICATION_FIELDS.password.label}
              control={control}
              validationRules={{ required: VALIDATION_ERRORS.requiredField }}
              isFormError={isError}
            />
          </li>
        </ul>
        <div className={styles['auth-form__info-box']}>
          <p data-test-id='hint'>{isError && 'Неверный логин или пароль!'}</p>
          <Link to={ROUTES.passwordRecovery}>{isError ? 'Восстановить?' : 'Забыли логин или пароль?'}</Link>
        </div>
        <div className={styles['auth-form__submit-box']}>
          <button type='submit' disabled={!isFormValid && submitCount > 0}>
            Вход
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
