import React from 'react';

import styles from './Wrapper.module.scss';

type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => <div className={styles.wrapper}>{children}</div>;
