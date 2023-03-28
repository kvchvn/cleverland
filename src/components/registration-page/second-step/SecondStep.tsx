import React from 'react';
import { Control } from 'react-hook-form';

import { REGISTRATION_FIELDS, VALIDATION_ERRORS } from '../../../constants';
import { RegistrationRequestBody } from '../../../types';
import { InputBox } from '../../common/input-box';

type SecondStepProps = {
  control: Control<RegistrationRequestBody>;
};

export const SecondStep = ({ control }: SecondStepProps) => (
  <>
    <li>
      <InputBox
        type='text'
        control={control}
        validationRules={{ required: VALIDATION_ERRORS.requiredField }}
        name={REGISTRATION_FIELDS.firstName.name}
        label={REGISTRATION_FIELDS.firstName.label}
      />
    </li>
    <li>
      <InputBox
        type='text'
        control={control}
        validationRules={{ required: VALIDATION_ERRORS.requiredField }}
        name={REGISTRATION_FIELDS.lastName.name}
        label={REGISTRATION_FIELDS.lastName.label}
      />
    </li>
  </>
);
