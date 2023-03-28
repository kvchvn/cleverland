import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

import { BASE_API_URL, COOKIES } from '../../../constants';
import { isRequestError, isUserAuthorized } from '../../../helpers';
import { RequestError, User } from '../../../types';
import { RootState } from '../../store';
import { setUser } from '../user';

import libraryApi from './libraryApi';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_API_URL}/api/`,
  prepareHeaders: (headers) => {
    const token = Cookies.get(COOKIES.jwt);

    if (isUserAuthorized()) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  },
}) as BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | RequestError,
  Record<string, unknown>,
  FetchBaseQueryMeta
>;

export const baseQueryWithUserDataReceiving: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | RequestError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const store = api.getState() as RootState;

  if (
    result.error &&
    (('status' in result.error && result.error.status === 401) ||
      (isRequestError(result.error.data) && result.error.data.error.status === 401))
  ) {
    api.abort();
  }

  if (store && isUserAuthorized()) {
    if (!store.user.data && api.endpoint !== 'getUser') {
      const getUser = libraryApi.endpoints.getUser.initiate();

      getUser(api.dispatch, api.getState, api.extra)
        .then((res) => {
          if (res.data) {
            api.dispatch(setUser(res.data));
          }
        })
        .catch((err) => console.error('Error in /me request! ', err));
    }

    if (api.endpoint === 'getUser') {
      api.dispatch(setUser(result.data as User));
    }
  }

  return result;
};
