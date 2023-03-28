import { BookDetails, Category } from '../types';

export const ALL_BOOKS_CATEGORY: Category = { id: 0, name: 'Все книги', path: 'all' };

export const BOOK_DETAILED_INFO_LABELS: Omit<BookDetails, 'categories'> & { categories: string } = {
  publish: 'Издательство',
  issueYear: 'Год издания',
  pages: 'Страниц',
  cover: 'Переплет',
  format: 'Формат',
  categories: 'Жанр',
  weight: 'Вес',
  ISBN: 'ISBN',
  producer: 'Изготовитель',
};
