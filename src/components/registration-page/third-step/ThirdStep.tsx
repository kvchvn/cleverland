import React from 'react';
import { Control } from 'react-hook-form';

import { REGISTRATION_FIELDS, VALIDATION_ERRORS } from '../../../constants';
import { validateEmail, validatePhone } from '../../../helpers';
import { RegistrationRequestBody } from '../../../types';
import { InputBox } from '../../common/input-box';

type ThirdStepProps = {
  control: Control<RegistrationRequestBody>;
};

export const ThirdStep = ({ control }: ThirdStepProps) => (
  <>
    <li>
      <InputBox
        type='text'
        name={REGISTRATION_FIELDS.phone.name}
        label={REGISTRATION_FIELDS.phone.label}
        control={control}
        initialHintText={REGISTRATION_FIELDS.phone.hint}
        validationRules={{
          validate: (val) => validatePhone(val) || REGISTRATION_FIELDS.phone.hint,
          required: VALIDATION_ERRORS.requiredField,
        }}
      />
    </li>
    <li>
      <InputBox
        type='email'
        name={REGISTRATION_FIELDS.email.name}
        label={REGISTRATION_FIELDS.email.label}
        control={control}
        validationRules={{
          validate: (val) => validateEmail(val) || VALIDATION_ERRORS.invalidEmail,
          required: VALIDATION_ERRORS.requiredField,
        }}
      />
    </li>
  </>
);
