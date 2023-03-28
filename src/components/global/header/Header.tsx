import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '../../../constants';
import { HeaderUserBox } from '../../common/header-user-box';
import { BurgerButton } from '../../navigation/burger-button';
import { Wrapper } from '../wrapper';

import styles from './Header.module.scss';

export const Header = () => {
  const { pathname } = useLocation();

  const getTitle = () => {
    switch (pathname) {
      case ROUTES.profile:
        return 'Личный кабинет';
      default:
        return 'Библиотека';
    }
  };

  return (
    <header className={styles.header}>
      <Wrapper>
        <BurgerButton />
        <Link to={ROUTES.main} className={styles.header__logo} />
        <h3>{getTitle()}</h3>
        <HeaderUserBox />
      </Wrapper>
    </header>
  );
};
