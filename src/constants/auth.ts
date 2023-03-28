import { AuthModalProps } from '../components/common/auth-modal';
import {
  AuthenticationFieldName,
  FieldContent,
  ForgotPasswordFieldName,
  ProfileFieldName,
  RegistrationFieldName,
  ResetPasswordFieldName,
} from '../types';

import { LOGIN_VALIDATION_SUBJECT, PASSWORD_VALIDATION_SUBJECT } from './validation';

const REGISTRATION_FIRST_STEP = 1;
const REGISTRATION_LAST_STEP = 3;

export const REGISTRATION_STEPS = {
  first: {
    step: REGISTRATION_FIRST_STEP,
    text: 'Следующий шаг',
  },
  preLast: {
    step: REGISTRATION_LAST_STEP - 1,
    text: 'Последний шаг',
  },
  last: {
    step: REGISTRATION_LAST_STEP,
    text: 'Зарегистрироваться',
  },
};

export const REGISTRATION_FIELDS: FieldContent<RegistrationFieldName> = {
  username: {
    name: 'username',
    label: 'Придумайте логин для входа',
    hint: `Используйте для логина ${LOGIN_VALIDATION_SUBJECT.latinLetter} и ${LOGIN_VALIDATION_SUBJECT.number}`,
  },
  password: {
    name: 'password',
    label: 'Пароль',
    hint: `Пароль ${PASSWORD_VALIDATION_SUBJECT.length}, с ${PASSWORD_VALIDATION_SUBJECT.capitalLetter} и ${PASSWORD_VALIDATION_SUBJECT.number}`,
  },
  firstName: {
    name: 'firstName',
    label: 'Имя',
  },
  lastName: {
    name: 'lastName',
    label: 'Фамилия',
  },
  phone: {
    name: 'phone',
    label: 'Номер телефона',
    hint: 'В формате +375 (xx) xxx-xx-xx',
  },
  email: {
    name: 'email',
    label: 'E-mail',
  },
};

export const AUTHENTICATION_FIELDS: FieldContent<AuthenticationFieldName> = {
  identifier: {
    name: 'identifier',
    label: 'Логин',
  },
  password: {
    name: 'password',
    label: 'Пароль',
  },
};

export const FORGOT_PASSWORD_FIELDS: FieldContent<ForgotPasswordFieldName> = {
  email: {
    name: 'email',
    label: 'E-mail',
  },
};

export const RESET_PASSWORD_FIELDS: FieldContent<ResetPasswordFieldName> = {
  password: {
    name: 'password',
    label: 'Новый пароль',
    hint: `Пароль ${PASSWORD_VALIDATION_SUBJECT.length}, с ${PASSWORD_VALIDATION_SUBJECT.capitalLetter} и ${PASSWORD_VALIDATION_SUBJECT.number}`,
  },
  passwordConfirmation: {
    name: 'passwordConfirmation',
    label: 'Повторите пароль',
  },
};

export const PROFILE_EDITING_FIELDS: FieldContent<ProfileFieldName> = {
  login: {
    name: 'login',
    label: REGISTRATION_FIELDS.username.label,
    hint: REGISTRATION_FIELDS.username.hint,
  },
  password: REGISTRATION_FIELDS.password,
  firstName: REGISTRATION_FIELDS.firstName,
  lastName: REGISTRATION_FIELDS.lastName,
  email: REGISTRATION_FIELDS.email,
  phone: REGISTRATION_FIELDS.phone,
};

export const AUTH_FAILURE_MODAL: Omit<AuthModalProps, 'buttonAction'> = {
  title: 'Вход не выполнен',
  description: 'Что-то пошло не так. Попробуйте ещё раз',
  buttonText: 'Повторить',
};

export const REGISTRATION_FAILURE_MODAL: { [P in '400' | 'default']: Omit<AuthModalProps, 'buttonAction'> } = {
  '400': {
    title: 'Данные не сохранились',
    description:
      'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
    buttonText: 'Назад к регистрации',
  },
  default: {
    title: 'Данные не сохранились',
    description: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
    buttonText: 'Повторить',
  },
};

export const REGISTRATION_SUCCESS_MODAL: Omit<AuthModalProps, 'buttonAction'> = {
  title: 'Регистрация успешна',
  description: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
  buttonText: 'Вход',
};

export const FORGOT_PASSWORD_SUCCESS_MODAL: Omit<AuthModalProps, 'buttonAction'> = {
  title: 'Письмо выслано',
  description: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
};

export const RESET_PASSWORD_SUCCESS_MODAL: Omit<AuthModalProps, 'buttonAction'> = {
  title: 'Новые данные сохранены',
  description: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
  buttonText: 'Вход',
};

export const RESET_PASSWORD_FAILURE_MODAL: Omit<AuthModalProps, 'buttonAction'> = {
  title: 'Данные не сохранились',
  description: 'Что-то пошло не так. Попробуйте ещё раз',
  buttonText: 'Повторить',
};
