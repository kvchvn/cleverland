import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { REGISTRATION_FAILURE_MODAL, REGISTRATION_STEPS, REGISTRATION_SUCCESS_MODAL, ROUTES } from '../../../constants';
import { getRequestErrorStatusCode } from '../../../helpers';
import { useRegistrationMutation } from '../../../store';
import { RegistrationRequestBody } from '../../../types';
import { AuthModal } from '../../common/auth-modal';
import { Loading } from '../../global/loading';
import { RegistrationSteps } from '../registration-steps';

import styles from './RegistrationForm.module.scss';

type RegistrationFormState = {
  step: number;
  buttonText: string;
};

export const RegistrationForm = () => {
  const [state, setState] = useState<RegistrationFormState>({
    step: REGISTRATION_STEPS.first.step,
    buttonText: REGISTRATION_STEPS.first.text,
  });
  const [register, { isLoading, isSuccess, isError, error, reset: resetRegistrationStatus }] =
    useRegistrationMutation();
  const navigate = useNavigate();

  const {
    handleSubmit: handleSubmitWrapper,
    control,
    getValues: getFormValues,
    reset: resetForm,
    formState: { submitCount, isValid: isFormValid, isSubmitSuccessful, touchedFields },
  } = useForm<RegistrationRequestBody>({
    mode: 'all',
    shouldFocusError: false,
  });

  const goToAuthPage = () => navigate(ROUTES.auth);

  const returnToTheFirstStep = () => {
    resetForm({});
    resetRegistrationStatus();
    setState((prevState) => ({
      ...prevState,
      step: REGISTRATION_STEPS.first.step,
      buttonText: REGISTRATION_STEPS.first.text,
    }));
  };

  const handleRegister = (formValues: RegistrationRequestBody = getFormValues()) => {
    register(formValues);
  };

  const handleSubmit = handleSubmitWrapper((formValues) => {
    if (state.step === REGISTRATION_STEPS.last.step) {
      handleRegister(formValues);
    } else {
      setState((prevState) => {
        const updatedStep = prevState.step + 1;
        let buttonText: string;

        switch (updatedStep) {
          case REGISTRATION_STEPS.preLast.step:
            buttonText = REGISTRATION_STEPS.preLast.text;
            break;
          case REGISTRATION_STEPS.last.step:
            buttonText = REGISTRATION_STEPS.last.text;
            break;
          default:
            buttonText = prevState.buttonText;
        }

        return { ...prevState, step: updatedStep, buttonText };
      });
    }
  });

  useEffect(() => {
    // to reset submitCount
    resetForm({ ...getFormValues() }, { keepSubmitCount: false });
  }, [isSubmitSuccessful, getFormValues, resetForm]);

  if (isSuccess) {
    return (
      <AuthModal
        title={REGISTRATION_SUCCESS_MODAL.title}
        description={REGISTRATION_SUCCESS_MODAL.description}
        buttonText={REGISTRATION_SUCCESS_MODAL.buttonText}
        buttonAction={goToAuthPage}
      />
    );
  }

  if (isError) {
    const statusCode = getRequestErrorStatusCode(error);

    return (
      <>
        {isLoading && <Loading />}
        {statusCode && statusCode === 400 ? (
          <AuthModal
            title={REGISTRATION_FAILURE_MODAL[statusCode].title}
            description={REGISTRATION_FAILURE_MODAL[statusCode].description}
            buttonText={REGISTRATION_FAILURE_MODAL[statusCode].buttonText}
            buttonAction={returnToTheFirstStep}
          />
        ) : (
          <AuthModal
            title={REGISTRATION_FAILURE_MODAL.default.title}
            description={REGISTRATION_FAILURE_MODAL.default.description}
            buttonText={REGISTRATION_FAILURE_MODAL.default.buttonText}
            buttonAction={handleRegister}
          />
        )}
      </>
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      <article className={styles['reg-form__heading-box']}>
        <h4>Регистрация</h4>
        <p>
          {state.step} шаг из {REGISTRATION_STEPS.last.step}
        </p>
      </article>
      <form autoComplete='off' onSubmit={handleSubmit} className={styles['reg-form']} data-test-id='register-form'>
        <RegistrationSteps currentStep={state.step} control={control} />
        <div className={styles['reg-form__submit-box']}>
          <button
            type='submit'
            disabled={!isFormValid && (Boolean(Object.keys(touchedFields).length) || submitCount > 0)}
          >
            {state.buttonText}
          </button>
          <p>
            Есть учетная запись?
            <Link to={ROUTES.auth}>Войти</Link>
          </p>
        </div>
      </form>
    </>
  );
};
