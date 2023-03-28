import { BookBase, BookBooking, BookDelivery, Category, CategoryTransformed } from '../types';

import { formatDate } from './date';

export const getBookingButtonText = (booking: BookBooking | null, delivery: BookDelivery | null) => {
  if (booking) {
    return 'Забронирована';
  }

  if (delivery) {
    return delivery.dateHandedTo
      ? `Занята до ${formatDate({
          date: delivery.dateHandedTo,
          mode: 'short',
        })}`
      : 'Занята';
  }

  return 'Забронировать';
};

export const composeBookAuthorshipText = ({
  authors,
  issueYear,
}: {
  authors: string[] | null;
  issueYear: string | null;
}) => {
  let resultString = authors ? authors.join(', ') : '';

  if (authors && issueYear) {
    resultString += ', ';
  }
  resultString += issueYear ? issueYear : '';

  return resultString;
};

export const calculateBooksByCategories = ({
  categories,
  books,
}: {
  categories: Category[];
  books?: BookBase[];
}): Category[] | CategoryTransformed[] => {
  const transformedCategories = [...categories].map((cat) => ({ ...cat, amount: 0 }));

  if (books) {
    books.forEach((book) => {
      if (book.categories) {
        book.categories.forEach((bookCategory) => {
          const currentCategory = transformedCategories.find((category) => category.name === bookCategory);

          if (currentCategory) {
            currentCategory.amount += 1;
          }
        });
      }
    });

    return transformedCategories;
  }

  return categories;
};
