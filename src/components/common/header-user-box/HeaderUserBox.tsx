import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import default_avatar from '../../../assets/svg/default_avatar.svg';
import { COOKIES, ROUTES } from '../../../constants';
import { removeUser, useUserSelector } from '../../../store';
import { useAppDispatch } from '../../../store/store';
import { ProgressiveImage } from '../progressive-image';

import styles from './HeaderUserBox.module.scss';

export const HeaderUserBox = () => {
  const user = useUserSelector();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleExitClick = () => {
    Cookies.remove(COOKIES.jwt);
    dispatch(removeUser());
    navigate(ROUTES.auth);
  };

  return (
    <div className={styles['user-box_container']}>
      <p>Привет{user ? `, ${user.firstName}!` : ', Странник'}</p>
      <div className={styles['user-box__avatar-box']}>
        <ProgressiveImage src={user?.avatar} defaultSrc={default_avatar} alt='Ваш аватар' />
      </div>
      <ul className={styles['user-box__dropdown-menu']}>
        <li>
          <Link to={ROUTES.profile} data-test-id='profile-button'>
            Профиль
          </Link>
        </li>
        <li onClick={handleExitClick}>Выход</li>
      </ul>
    </div>
  );
};
