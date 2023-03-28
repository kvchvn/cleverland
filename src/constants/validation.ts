import { CheckFnOptions, InputBoxStepByStepValidationProp } from '../types';

export const CHECK_FN_DEFAULT_OPTIONS: CheckFnOptions = {
  requiredLength: 0,
};

export const PASSWORD_MIN_LENGTH = 8;

export const LOGIN_VALIDATION_SUBJECT = {
  latinLetter: 'латинский алфавит',
  number: 'цифры',
};

export const PASSWORD_VALIDATION_SUBJECT = {
  length: `не менее ${PASSWORD_MIN_LENGTH} символов`,
  capitalLetter: 'заглавной буквой',
  number: 'цифрой',
};

export const PHONE_MASK = [
  '+',
  '3',
  '7',
  '5',
  ' ',
  '(',
  /[234]/,
  /[934]/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export const PHONE_MASK_PLACEHOLDER = 'x';

export const VALIDATION_ERRORS = {
  invalidPhone: 'В формате +375 (xx) xxx-xx-xx',
  invalidEmail: 'Введите корректный e-mail',
  requiredField: 'Поле не может быть пустым',
  differentPasswords: 'Пароли не совпадают',
};

export const LOGIN_STEP_BY_STEP_VALIDATION: InputBoxStepByStepValidationProp = [
  {
    type: 'hasLatinLetter',
    stringSlice: LOGIN_VALIDATION_SUBJECT.latinLetter,
  },
  { type: 'hasNumber', stringSlice: LOGIN_VALIDATION_SUBJECT.number },
];

export const PASSWORD_STEP_BY_STEP_VALIDATION: InputBoxStepByStepValidationProp = [
  {
    type: 'hasRequiredLength',
    stringSlice: PASSWORD_VALIDATION_SUBJECT.length,
  },
  { type: 'hasCapitalLetter', stringSlice: PASSWORD_VALIDATION_SUBJECT.capitalLetter },
  { type: 'hasNumber', stringSlice: PASSWORD_VALIDATION_SUBJECT.number },
];
