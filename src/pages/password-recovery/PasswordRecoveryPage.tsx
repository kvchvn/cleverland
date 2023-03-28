import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { ForgotPasswordForm } from '../../components/password-recovery-page/forgot-password-form';
import { ResetPasswordForm } from '../../components/password-recovery-page/reset-password-form';

export const PasswordRecoveryPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  return code ? <ResetPasswordForm code={code} /> : <ForgotPasswordForm />;
};
