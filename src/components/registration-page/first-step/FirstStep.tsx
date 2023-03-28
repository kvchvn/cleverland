import React from 'react';
import { Control } from 'react-hook-form';

import {
  LOGIN_STEP_BY_STEP_VALIDATION,
  PASSWORD_STEP_BY_STEP_VALIDATION,
  REGISTRATION_FIELDS,
  VALIDATION_ERRORS,
} from '../../../constants';
import { validateLogin, validatePassword } from '../../../helpers';
import { RegistrationRequestBody } from '../../../types';
import { InputBox } from '../../common/input-box';

type FirstStepProps = {
  control: Control<RegistrationRequestBody>;
};

export const FirstStep = ({ control }: FirstStepProps) => (
  <>
    <li>
      <InputBox
        type='text'
        name={REGISTRATION_FIELDS.username.name}
        label={REGISTRATION_FIELDS.username.label}
        initialHintText={REGISTRATION_FIELDS.username.hint}
        validationRules={{
          validate: (val) => validateLogin(val) || REGISTRATION_FIELDS.username.hint,
          required: VALIDATION_ERRORS.requiredField,
        }}
        stepByStepValidationRules={LOGIN_STEP_BY_STEP_VALIDATION}
        control={control}
      />
    </li>
    <li>
      <InputBox
        type='password'
        name={REGISTRATION_FIELDS.password.name}
        label={REGISTRATION_FIELDS.password.label}
        initialHintText={REGISTRATION_FIELDS.password.hint}
        validationRules={{
          validate: (val) => validatePassword(val) || REGISTRATION_FIELDS.password.hint,
          required: VALIDATION_ERRORS.requiredField,
        }}
        stepByStepValidationRules={PASSWORD_STEP_BY_STEP_VALIDATION}
        control={control}
      />
    </li>
  </>
);
