import React from 'react';
import classnames from 'classnames';

import { toggleAppNavVisibility, useAppNavVisibilitySelector } from '../../../store';
import { useAppDispatch } from '../../../store/store';

import styles from './BurgerButton.module.scss';

export const BurgerButton = () => {
  const isAppNavVisible = useAppNavVisibilitySelector();
  const dispatch = useAppDispatch();

  const complexStyles = {
    button: classnames(styles.button, { [styles.active]: isAppNavVisible }),
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleAppNavVisibility());
  };

  return (
    <button type='button' onClick={handleClick} className={complexStyles.button} data-test-id='button-burger'>
      <span />
      <span />
      <span />
    </button>
  );
};
