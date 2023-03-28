export const PARAMS = {
  category: 'category',
  bookId: 'bookId',
};

export const ROUTES = {
  main: '/',
  books: {
    base: '/books',
    all: '/books/all',
    category: `/books/:${PARAMS.category}`,
    specificBook: `/books/:${PARAMS.category}/:${PARAMS.bookId}`,
  },
  terms: '/terms',
  contract: '/contract',
  auth: '/auth',
  registration: '/registration',
  passwordRecovery: '/forgot-pass',
  profile: '/profile',
  notFound: '*',
};

export const COOKIES = {
  jwt: 'jwt',
};

export const TERMS_PAGE_TITLE = {
  terms: 'Правила использования',
  contract: 'Договор оферты',
};
