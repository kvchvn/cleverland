import { CHECK_FN_DEFAULT_OPTIONS, PASSWORD_MIN_LENGTH, PHONE_MASK_PLACEHOLDER } from '../constants';
import { CheckFnOptions, CheckFnReturn } from '../types';

export const check = (value: string, options: CheckFnOptions = CHECK_FN_DEFAULT_OPTIONS): CheckFnReturn => ({
  hasLatinLetter: /\p{sc=Latn}/u.test(value),
  hasNumber: /\d/.test(value),
  hasOnlyLatinLetterOrNumber: /^[\p{sc=Latn}\d]*$/u.test(value),
  hasCapitalLetter: /[A-ZА-Я]/.test(value),
  hasRequiredLength: value.length >= options.requiredLength,
  hasValidEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
});

export const validateLogin = (value: string) => {
  const checking = check(value);

  return checking.hasOnlyLatinLetterOrNumber && checking.hasLatinLetter && checking.hasNumber;
};

export const validatePassword = (value: string) => {
  const checking = check(value, { requiredLength: PASSWORD_MIN_LENGTH });

  return checking.hasCapitalLetter && checking.hasRequiredLength && checking.hasNumber;
};

export const validatePhone = (value: string) => !value.includes(PHONE_MASK_PLACEHOLDER);

export const validateEmail = (value: string) => check(value).hasValidEmail;
