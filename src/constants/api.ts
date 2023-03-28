export const BASE_API_URL = 'https://strapi.cleverland.by';

export const API_ENDPOINTS = {
  categories: 'categories',
  books: 'books',
  comments: 'comments',
  bookings: 'bookings',
  registration: 'auth/local/register',
  auth: 'auth/local',
  forgotPassword: 'auth/forgot-password',
  resetPassword: 'auth/reset-password',
  users: 'users',
  upload: 'upload',
};

export const QUERY_STATUSES = {
  isLoading: 'pending',
  isError: 'rejected',
  isSuccess: 'fulfilled',
};
