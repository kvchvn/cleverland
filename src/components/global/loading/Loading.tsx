import React, { useEffect } from 'react';

import { LOADING_ATTRIBUTE } from '../../../constants';
import { disableScrolling, enableScrolling } from '../../../helpers';

import styles from './Loading.module.scss';

export const Loading = () => {
  useEffect(() => {
    disableScrolling(document.body);
    document.body.setAttribute(LOADING_ATTRIBUTE, '');

    return () => {
      enableScrolling(document.body);
      document.body.removeAttribute(LOADING_ATTRIBUTE);
    };
  }, []);

  return (
    <section className={styles.loading__overlay} data-test-id='loader'>
      <span className={styles.loading__spinner} />
    </section>
  );
};
