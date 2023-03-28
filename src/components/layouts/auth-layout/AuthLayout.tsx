import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './AuthLayout.module.scss';

export const AuthLayout = () => (
  <div className={styles['auth-layout__wrapper']}>
    <h4>Cleverland</h4>
    <main className={styles['auth-layout__main']} data-test-id='auth'>
      <Outlet />
    </main>
  </div>
);
