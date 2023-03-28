import { Nullable } from './common';

export interface Category {
  id: number;
  name: string;
  path: string;
}

export interface CategoryTransformed extends Category {
  amount: number;
}

export interface BookImage {
  url: string;
}

export interface BookBooking {
  id: number;
  order: boolean;
  dateOrder: Nullable<string>;
  customerId: Nullable<number>;
  customerFirstName: Nullable<string>;
  customerLastName: Nullable<string>;
}

export interface BookDelivery {
  id: number;
  handed: boolean;
  dateHandedFrom: Nullable<string>;
  dateHandedTo: Nullable<string>;
  recipientId: Nullable<number>;
  recipientFirstName: Nullable<string>;
  recipientLastName: Nullable<string>;
}

export interface BookHistory {
  id: Nullable<number>;
  userId: Nullable<number>;
}

export interface BookBase {
  id: number;
  image: Nullable<BookImage>;
  issueYear: Nullable<string>;
  rating: Nullable<number>;
  title: string;
  authors: Nullable<string[]>;
  categories: Nullable<string[]>;
  booking: Nullable<BookBooking>;
  delivery: Nullable<BookDelivery>;
  histories: Nullable<BookHistory[]>;
}

export interface BookComment {
  id: Nullable<number>;
  rating: number;
  text: Nullable<string>;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: Nullable<string>;
  };
}

export interface BookDetails {
  issueYear: Nullable<string>;
  categories: Nullable<string[]>;
  publish: Nullable<string>;
  pages: Nullable<string>;
  cover: Nullable<string>;
  weight: Nullable<string>;
  format: Nullable<string>;
  ISBN: Nullable<string>;
  producer: Nullable<string>;
}

export type BookDetailsModified = Omit<BookDetails, 'categories'> & { categories: Nullable<string> };

export interface Book extends Omit<BookBase, 'image'>, Omit<BookDetails, 'issueYear' | 'categories'> {
  images: Nullable<BookImage[]>;
  description: Nullable<string>;
  comments: Nullable<BookComment[]>;
}

export interface BookModified extends Omit<BookBase, 'image' | 'issueYear' | 'categories'> {
  images: Nullable<BookImage[]>;
  description: Nullable<string>;
  comments: Nullable<BookComment[]>;
  details: Omit<BookDetails, 'categories'> & { categories: Nullable<string> };
}
