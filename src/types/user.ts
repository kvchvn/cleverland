import { RegistrationFieldName } from './auth';
import { BookBase } from './books';
import { Nullable } from './common';

export type ProfileFieldName = Exclude<RegistrationFieldName, 'username'> | 'login';

export type ProfileEditingForm = {
  [Property in ProfileFieldName]: string;
};

interface UserRole {
  id: number;
  description: string;
  type: string;
}

export interface UserComment {
  id: number;
  rating: number;
  text: Nullable<string>;
  bookId: number;
}

export interface UserBook extends Pick<BookBase, 'id' | 'title' | 'rating' | 'issueYear' | 'authors'> {
  image: Nullable<string>;
}

export interface UserBooking {
  id: Nullable<number>;
  order: Nullable<boolean>;
  dateOrder: Nullable<string>;
  book: Nullable<UserBook>;
}

export interface UserDelivery {
  id: Nullable<number>;
  handed: Nullable<boolean>;
  dateHandedFrom: Nullable<string>;
  dateHandedTo: Nullable<string>;
  book: Nullable<UserBook>;
}

export interface UserHistory {
  id: Nullable<number>;
  books: Nullable<UserBook[]>;
}

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  comments: UserComment[];
  avatar: string;
  booking: UserBooking;
  delivery: UserDelivery;
  history: UserHistory;
}
