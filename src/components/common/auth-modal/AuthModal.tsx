import React from 'react';

import styles from './AuthModal.module.scss';

export type AuthModalProps = {
  title: string;
  description: string;
  buttonText?: string;
  buttonAction?: () => void | Promise<void>;
};

export const AuthModal = ({ title, description, buttonText, buttonAction }: AuthModalProps) => (
  <section className={styles['auth-modal']} data-test-id='status-block'>
    <h4>{title}</h4>
    <p>{description}</p>
    {buttonText && buttonAction && (
      <button type='button' onClick={buttonAction}>
        {buttonText}
      </button>
    )}
  </section>
);
