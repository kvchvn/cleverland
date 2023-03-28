import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  PASSWORD_STEP_BY_STEP_VALIDATION,
  RESET_PASSWORD_FAILURE_MODAL,
  RESET_PASSWORD_FIELDS,
  RESET_PASSWORD_SUCCESS_MODAL,
  ROUTES,
  VALIDATION_ERRORS,
} from '../../../constants';
import { validatePassword } from '../../../helpers';
import { useChangePasswordMutation } from '../../../store';
import { ResetPasswordRequestBody } from '../../../types';
import { AuthModal } from '../../common/auth-modal';
import { InputBox } from '../../common/input-box';
import { Loading } from '../../global/loading';

import styles from './ResetPasswordForm.module.scss';

type ResetPasswordFormProps = {
  code: string;
};

export const ResetPasswordForm = ({ code }: ResetPasswordFormProps) => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit: handleSubmitWrapper,
    formState: { submitCount, touchedFields, errors: formErrors },
    getValues: getFormValues,
    clearErrors,
  } = useForm<Omit<ResetPasswordRequestBody, 'code'>>({
    mode: 'onBlur',
    shouldFocusError: false,
  });

  const [changePassword, { isLoading, isSuccess, isError }] = useChangePasswordMutation();

  const goToAuthPage = () => navigate(ROUTES.auth);

  const handleChangePassword = (formValues: Omit<ResetPasswordRequestBody, 'code'> = getFormValues()) => {
    changePassword({ ...formValues, code });
  };

  const handleSubmit = handleSubmitWrapper((formValues) => {
    handleChangePassword(formValues);
  });

  const handleChange = () => {
    clearErrors();
  };

  if (isSuccess) {
    return (
      <AuthModal
        title={RESET_PASSWORD_SUCCESS_MODAL.title}
        description={RESET_PASSWORD_SUCCESS_MODAL.description}
        buttonText={RESET_PASSWORD_SUCCESS_MODAL.buttonText}
        buttonAction={goToAuthPage}
      />
    );
  }

  if (isError) {
    return (
      <>
        {isLoading && <Loading />}
        <AuthModal
          title={RESET_PASSWORD_FAILURE_MODAL.title}
          description={RESET_PASSWORD_FAILURE_MODAL.description}
          buttonText={RESET_PASSWORD_FAILURE_MODAL.buttonText}
          buttonAction={handleChangePassword}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      <h4>Восстановление пароля</h4>
      <form
        autoComplete='off'
        onSubmit={handleSubmit}
        onChange={handleChange}
        className={styles['reset-pass-form']}
        data-test-id='reset-password-form'
      >
        <ul className={styles['reset-pass-form__inputs-list']}>
          <li>
            <InputBox
              type='password'
              name={RESET_PASSWORD_FIELDS.password.name}
              label={RESET_PASSWORD_FIELDS.password.label}
              control={control}
              validationRules={{
                validate: (val: string) => validatePassword(val) || RESET_PASSWORD_FIELDS.password.hint,
                required: VALIDATION_ERRORS.requiredField,
              }}
              initialHintText={RESET_PASSWORD_FIELDS.password.hint}
              stepByStepValidationRules={PASSWORD_STEP_BY_STEP_VALIDATION}
            />
          </li>
          <li>
            <InputBox
              type='password'
              name={RESET_PASSWORD_FIELDS.passwordConfirmation.name}
              label={RESET_PASSWORD_FIELDS.passwordConfirmation.label}
              control={control}
              validationRules={{
                validate: (val: string, formValues) =>
                  val === (formValues as ResetPasswordRequestBody).password || VALIDATION_ERRORS.differentPasswords,
                required: VALIDATION_ERRORS.requiredField,
              }}
            />
          </li>
        </ul>
        <button
          type='submit'
          disabled={Boolean(Object.keys(formErrors).length && Object.keys(touchedFields).length) || submitCount > 0}
        >
          Сохранить изменения
        </button>
        <p>После сохранения войдите в библиотеку, используя новый пароль</p>
      </form>
    </>
  );
};
