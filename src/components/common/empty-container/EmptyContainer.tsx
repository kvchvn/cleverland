import React from 'react';
import classnames from 'classnames';

import { EmptyContainerType } from '../../../types';

import styles from './EmptyContainer.module.scss';

type EmptyContainerProps = {
  children: React.ReactNode;
  dataTestId: string;
  type?: EmptyContainerType;
};

export const EmptyContainer = ({ children, dataTestId, type = EmptyContainerType.Base }: EmptyContainerProps) => {
  const complexStyles = {
    box: classnames(styles['empty-container'], { [styles['empty-container-warning']]: type === 'warning' }),
  };

  return (
    <div className={complexStyles.box} data-test-id={dataTestId}>
      {children}
    </div>
  );
};
