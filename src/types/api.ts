import { RegistrationFieldName } from './auth';
import { User } from './user';

export interface RequestError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

export type QueryStatus = 'pending' | 'rejected' | 'fulfilled' | undefined;

export type RegistrationRequestBody = {
  [Property in RegistrationFieldName]: string;
};

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface AuthRequestBody {
  identifier: string;
  password: string;
}

export interface PasswordResettingRequestBody {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export interface ForgotPassRequestBody {
  email: string;
}

export interface ResetPasswordRequestBody {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export interface AddFeedbackRequestBody {
  data: {
    rating: number;
    text: string;
    book: string;
    user: string;
  };
}

export interface AddFeedbackResponse {
  data: {
    id: number;
    attributes: {
      rating: number;
      text: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
  meta: Record<string, unknown>;
}

export interface BookingRequestBody {
  dateOrder: string;
  book: string;
  customer: string;
}

export interface BookingResponse {
  data: {
    id: number;
    attributes: {
      order: true;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      dateOrder: string;
    };
  };
  meta: Record<string, unknown>;
}
