import React from 'react';
import classnames from 'classnames';

import styles from './DropdownButton.module.scss';

type DropdownButtonProps = {
  isDropped: boolean;
  toggleFn?: () => void;
  dataTestId?: string;
};

export const DropdownButton = ({ isDropped, toggleFn, dataTestId }: DropdownButtonProps) => {
  const complexStyles = {
    button: classnames(styles['dropdown-button'], { [styles.active]: isDropped }),
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFn) {
      toggleFn();
    }
  };

  return <button type='button' onClick={handleClick} className={complexStyles.button} data-test-id={dataTestId} />;
};
