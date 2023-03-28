import React from 'react';
import { Control } from 'react-hook-form';

import { REGISTRATION_STEPS } from '../../../constants';
import { RegistrationRequestBody } from '../../../types';
import { FirstStep } from '../first-step';
import { SecondStep } from '../second-step';
import { ThirdStep } from '../third-step';

import styles from './RegistrationSteps.module.scss';

type RegistrationStepsProps = {
  currentStep: number;
  control: Control<RegistrationRequestBody>;
};

export const RegistrationSteps = ({ currentStep, control }: RegistrationStepsProps) => {
  const steps = [
    { step: REGISTRATION_STEPS.first.step, component: <FirstStep control={control} /> },
    { step: REGISTRATION_STEPS.preLast.step, component: <SecondStep control={control} /> },
    { step: REGISTRATION_STEPS.last.step, component: <ThirdStep control={control} /> },
  ];

  return (
    <ul className={styles['reg-form__inputs-list']}>
      {steps.find(({ step }) => step === currentStep)?.component || null}
    </ul>
  );
};
