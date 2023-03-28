export type RegistrationFieldName = 'username' | 'password' | 'firstName' | 'lastName' | 'phone' | 'email';
export type AuthenticationFieldName = 'identifier' | 'password';
export type ForgotPasswordFieldName = 'email';
export type ResetPasswordFieldName = 'password' | 'passwordConfirmation';

export type FieldContent<T extends string> = {
  [Property in T]: {
    name: Property;
    label: string;
    hint?: string;
  };
};

export type RegistrationSteps = JSX.Element[][];
