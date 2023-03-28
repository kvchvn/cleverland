import { createApi } from '@reduxjs/toolkit/query/react';

import { ALL_BOOKS_CATEGORY, API_ENDPOINTS } from '../../../constants';
import {
  AddFeedbackRequestBody,
  AddFeedbackResponse,
  AuthRequestBody,
  AuthResponse,
  Book,
  BookBase,
  BookingRequestBody,
  BookingResponse,
  BookModified,
  Category,
  ForgotPassRequestBody,
  RegistrationRequestBody,
  ResetPasswordRequestBody,
  User,
} from '../../../types';

import { baseQueryWithUserDataReceiving } from './baseQuery';

const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: baseQueryWithUserDataReceiving,
  tagTypes: ['Book', 'Books', 'User'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => API_ENDPOINTS.categories,
      transformResponse: (res: Category[]) => {
        const updatedRes = [...res];

        updatedRes.unshift(ALL_BOOKS_CATEGORY);

        return updatedRes;
      },
    }),
    getAllBooks: builder.query<BookBase[], void>({
      query: () => API_ENDPOINTS.books,
      providesTags: ['Books'],
    }),
    getBookById: builder.query<BookModified | BookBase | undefined, string>({
      query: (bookId) => `${API_ENDPOINTS.books}/${bookId}`,
      providesTags: (result, _, __) =>
        result
          ? [
              {
                type: 'Book' as const,
                id: result.id,
              },
            ]
          : ['Book'],
      transformResponse: (res: Book | BookBase[], _, bookId) => {
        if (!Array.isArray(res)) {
          const { publish, issueYear, cover, format, ISBN, pages, weight, categories, producer, ...bookData } = res;
          const categoriesStringified = categories ? categories.join(', ') : null;
          const bookDetails = {
            publish,
            issueYear,
            cover,
            format,
            ISBN,
            pages,
            weight,
            categories: categoriesStringified,
            producer,
          };

          return { ...bookData, details: bookDetails };
        }

        // this case is for tests
        return res.find((book) => String(book.id) === bookId);
      },
    }),
    registration: builder.mutation<AuthResponse, RegistrationRequestBody>({
      query: (body) => ({
        url: API_ENDPOINTS.registration,
        method: 'POST',
        body,
      }),
    }),
    authentication: builder.mutation<AuthResponse, AuthRequestBody>({
      query: (body) => ({
        url: API_ENDPOINTS.auth,
        method: 'POST',
        body,
      }),
    }),
    sendLinkToRecoveryPassword: builder.mutation<{ ok: boolean }, ForgotPassRequestBody>({
      query: (body) => ({
        url: API_ENDPOINTS.forgotPassword,
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation<AuthResponse, ResetPasswordRequestBody>({
      query: (body) => ({
        url: API_ENDPOINTS.resetPassword,
        method: 'POST',
        body,
      }),
    }),
    addFeedback: builder.mutation<AddFeedbackResponse, AddFeedbackRequestBody>({
      query: (body) => ({
        url: API_ENDPOINTS.comments,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Book', id: arg.data.book }, 'User'],
    }),
    updateFeedback: builder.mutation<AddFeedbackResponse, AddFeedbackRequestBody & { commentId: string }>({
      query: ({ commentId, ...body }) => ({
        url: `${API_ENDPOINTS.comments}/${commentId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Book', id: arg.data.book }, 'User'],
    }),
    setBooking: builder.mutation<BookingResponse, BookingRequestBody>({
      query: (bodySlice) => ({
        url: API_ENDPOINTS.bookings,
        method: 'POST',
        body: {
          data: {
            order: true,
            ...bodySlice,
          },
        },
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Book', id: arg.book }, 'Books'],
    }),
    updateBooking: builder.mutation<BookingResponse, BookingRequestBody & { bookingId: string }>({
      query: ({ bookingId, ...bodySlice }) => ({
        url: `${API_ENDPOINTS.bookings}/${bookingId}`,
        method: 'PUT',
        body: {
          data: {
            order: true,
            ...bodySlice,
          },
        },
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Book', id: arg.book }, 'Books'],
    }),
    resetBooking: builder.mutation<BookingResponse, { bookingId: string; bookId: string }>({
      query: ({ bookingId }) => ({
        url: `${API_ENDPOINTS.bookings}/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Book', id: arg.bookId }, 'Books', 'User'],
    }),
    getUser: builder.query<User, void>({
      query: () => `${API_ENDPOINTS.users}/me`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<User, (Partial<RegistrationRequestBody> | { avatar: number }) & { userId: number }>({
      query: ({ userId, ...body }) => ({
        url: `${API_ENDPOINTS.users}/${userId}`,
        method: 'PUT',
        body: 'avatar' in body ? { avatar: body.avatar } : { ...body },
      }),
      invalidatesTags: ['User'],
    }),
    uploadFile: builder.mutation<[{ id: number }], FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.upload,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export default libraryApi;
export const {
  useGetCategoriesQuery,
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useRegistrationMutation,
  useAuthenticationMutation,
  useSendLinkToRecoveryPasswordMutation,
  useChangePasswordMutation,
  useAddFeedbackMutation,
  useSetBookingMutation,
  useUpdateBookingMutation,
  useResetBookingMutation,
  useGetUserQuery,
  useUploadFileMutation,
  useUpdateUserMutation,
  useUpdateFeedbackMutation,
} = libraryApi;
