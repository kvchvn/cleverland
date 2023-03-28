import React, { HTMLInputTypeAttribute, useState } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import InputMask from 'react-text-mask';
import classnames from 'classnames';

import { PHONE_MASK, PHONE_MASK_PLACEHOLDER, RESET_PASSWORD_FIELDS } from '../../../constants';
import { useStepByStepValidation } from '../../../hooks';
import { InputBoxStepByStepValidationProp } from '../../../types';

import styles from './InputBox.module.scss';

type InputBoxProps = {
  type: HTMLInputTypeAttribute;
  name: string;
  label: string;
  control: unknown;
  validationRules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  initialHintText?: string;
  stepByStepValidationRules?: InputBoxStepByStepValidationProp;
  isFormError?: boolean;
  disabled?: boolean;
};

export const InputBox = ({
  type: inputType,
  name,
  label,
  control,
  initialHintText,
  validationRules,
  stepByStepValidationRules,
  isFormError,
  disabled = false,
}: InputBoxProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    field: { onChange: onChangeField, onBlur: onBlurField, value: fieldValue },
    fieldState: { error: fieldError, invalid: isFieldInvalid, isTouched: isFieldTouched, isDirty: isFieldDirty },
    formState: { isSubmitted: isFormSubmitted, defaultValues },
  } = useController({
    name,
    control: control as Control,
    rules: validationRules,
  });

  const { hint, setHint, handleChangeWithStepByStepValidations } = useStepByStepValidation({
    inputType,
    initialHintText,
    stepByStepValidationRules,
  });

  const complexStyles = {
    passwordIconsBox: classnames([styles['password__icons-box']]),
    passwordEye: classnames(styles.password__eye, { [styles['password__eye-opened']]: isPasswordVisible }),
    passwordCheckmark: classnames({ [styles.password__checkmark]: !isFieldInvalid }),
    hint: classnames(styles.input__hint, { [styles['hint-highlighted']]: fieldError || isFormError }),
  };

  const handlePasswordEyeIconClick = () => setIsPasswordVisible((prevState) => !prevState);

  const getHintText = () => {
    if (hint.text) {
      if (
        isFormSubmitted &&
        !isFieldTouched &&
        !isFieldDirty &&
        defaultValues &&
        !defaultValues[name] &&
        validationRules?.required
      ) {
        return validationRules.required as string;
      }
      if (hint.visibility || !isFieldInvalid) {
        return hint.text;
      }
    }

    return fieldError?.message || '';
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;

    onChangeField(value);
    handleChangeWithStepByStepValidations(value);
  };

  const handleBlur = () => {
    onBlurField();
    setHint((prevHint) => ({ ...prevHint, visibility: false }));
  };

  const inputCommonProps = {
    id: name,
    placeholder: label,
    value: fieldValue || '',
    name,
    onBlur: handleBlur,
    onChange: handleChange,
    className: styles.input,
    disabled,
  };

  return (
    <div className={styles['input-box']}>
      <label htmlFor={name} className={styles.input__label}>
        <span>{label}</span>
        {name === 'phone' ? (
          <InputMask mask={PHONE_MASK} placeholderChar={PHONE_MASK_PLACEHOLDER} {...inputCommonProps} />
        ) : (
          <input type={inputType === 'password' && isPasswordVisible ? 'text' : inputType} {...inputCommonProps} />
        )}
        {inputType === 'password' && (
          <div className={complexStyles.passwordIconsBox}>
            {name !== RESET_PASSWORD_FIELDS.passwordConfirmation.name &&
              isFieldDirty &&
              !disabled &&
              validationRules?.validate && (
                <span className={complexStyles.passwordCheckmark} data-test-id='checkmark' />
              )}
            {isFieldDirty && (
              <span
                onClick={handlePasswordEyeIconClick}
                className={complexStyles.passwordEye}
                data-test-id={isPasswordVisible ? 'eye-opened' : 'eye-closed'}
              />
            )}
          </div>
        )}
      </label>
      <p className={complexStyles.hint} data-test-id='hint'>
        {disabled ? initialHintText : getHintText()}
      </p>
    </div>
  );
};
