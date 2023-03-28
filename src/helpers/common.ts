import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

import { COOKIES } from '../constants';
import { RequestError } from '../types';

import { isRequestError } from './typesDefinition';

export const disableScrolling = (element: HTMLElement) => {
  element.style.overflow = 'hidden';
};

export const enableScrolling = (element: HTMLElement) => {
  element.style.overflow = '';
};

export const getRequestErrorStatusCode = (error?: FetchBaseQueryError | SerializedError | RequestError) => {
  let statusCode: number | undefined;

  if (error) {
    if (isRequestError(error)) {
      statusCode = error.error.status;
    } else if ('status' in error && typeof error.status === 'number') {
      statusCode = error.status;
    }
  }

  return statusCode;
};

export const isUserAuthorized = () => Boolean(Cookies.get(COOKIES.jwt));
