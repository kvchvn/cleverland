import React from 'react';
import { Control } from 'react-hook-form';

import {
  LOGIN_STEP_BY_STEP_VALIDATION,
  PASSWORD_STEP_BY_STEP_VALIDATION,
  PROFILE_EDITING_FIELDS,
  VALIDATION_ERRORS,
} from '../../../constants';
import { validateEmail, validateLogin, validatePassword, validatePhone } from '../../../helpers';
import { useUserSelector } from '../../../store';
import { ProfileEditingForm } from '../../../types';
import { InputBox } from '../../common/input-box';

import styles from './ProfileFormInputs.module.scss';

type ProfileFormInputsProps = {
  control: Control<ProfileEditingForm>;
  isFormDisabled: boolean;
};

export const ProfileFormInputs = ({ control, isFormDisabled }: ProfileFormInputsProps) => {
  const user = useUserSelector();

  return user ? (
    <ul className={styles['profile-form__inputs-list']}>
      <li>
        <InputBox
          type='text'
          name={PROFILE_EDITING_FIELDS.login.name}
          label={PROFILE_EDITING_FIELDS.login.label}
          initialHintText={PROFILE_EDITING_FIELDS.login.hint}
          control={control}
          validationRules={{
            validate: (val) => validateLogin(val) || PROFILE_EDITING_FIELDS.login.hint,
            required: VALIDATION_ERRORS.requiredField,
          }}
          stepByStepValidationRules={LOGIN_STEP_BY_STEP_VALIDATION}
          disabled={isFormDisabled}
        />
      </li>
      <li>
        <InputBox
          type='password'
          name={PROFILE_EDITING_FIELDS.password.name}
          label={PROFILE_EDITING_FIELDS.password.label}
          initialHintText={PROFILE_EDITING_FIELDS.password.hint}
          validationRules={{
            validate: (val) => validatePassword(val) || PROFILE_EDITING_FIELDS.password.hint,
            required: VALIDATION_ERRORS.requiredField,
          }}
          stepByStepValidationRules={PASSWORD_STEP_BY_STEP_VALIDATION}
          control={control}
          disabled={isFormDisabled}
        />
      </li>
      <li>
        <InputBox
          type='text'
          control={control}
          name={PROFILE_EDITING_FIELDS.firstName.name}
          label={PROFILE_EDITING_FIELDS.firstName.label}
          disabled={isFormDisabled}
        />
      </li>
      <li>
        <InputBox
          type='text'
          control={control}
          name={PROFILE_EDITING_FIELDS.lastName.name}
          label={PROFILE_EDITING_FIELDS.lastName.label}
          disabled={isFormDisabled}
        />
      </li>
      <li>
        <InputBox
          type='text'
          name={PROFILE_EDITING_FIELDS.phone.name}
          label={PROFILE_EDITING_FIELDS.phone.label}
          control={control}
          initialHintText={PROFILE_EDITING_FIELDS.phone.hint}
          validationRules={{
            validate: (val) => validatePhone(val) || PROFILE_EDITING_FIELDS.phone.hint,
          }}
          disabled={isFormDisabled}
        />
      </li>
      <li>
        <InputBox
          type='email'
          name={PROFILE_EDITING_FIELDS.email.name}
          label={PROFILE_EDITING_FIELDS.email.label}
          control={control}
          validationRules={{
            validate: (val) => validateEmail(val) || VALIDATION_ERRORS.invalidEmail,
            required: VALIDATION_ERRORS.requiredField,
          }}
          disabled={isFormDisabled}
        />
      </li>
    </ul>
  ) : null;
};
