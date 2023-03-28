import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import Cookies from 'js-cookie';

import { COOKIES, QUERY_STATUSES, ROUTES, SCREEN_SIZE_OF_MENU_TOGGLE_VISIBILITY } from '../../../constants';
import { disableScrolling, enableScrolling } from '../../../helpers';
import {
  hideAppNav,
  hideBookCategories,
  removeUser,
  toggleBookCategoriesVisibility,
  useAllBooksStatusSelector,
  useAppNavVisibilitySelector,
  useBookCategoriesVisibilitySelector,
  useGetCategoriesQuery,
} from '../../../store';
import { useAppDispatch } from '../../../store/store';
import { DropdownButton } from '../../common/dropdown-button';
import { BookCategories } from '../book-categories';

import styles from './AppNavigation.module.scss';

export const AppNavigation = () => {
  const { data: categories } = useGetCategoriesQuery();

  const navigate = useNavigate();
  const allBooksStatus = useAllBooksStatusSelector();
  const isBookCategoriesVisible = useBookCategoriesVisibilitySelector();
  const isAppNavVisible = useAppNavVisibilitySelector();
  const dispatch = useAppDispatch();

  const navListRef = useRef<HTMLUListElement>(null);

  const complexStyles = {
    mainNav: classnames(styles['main-nav'], { [styles['main-nav_mobile']]: isAppNavVisible }),
    linksForUser: classnames(styles['main-nav__link-list'], styles['link-list_user']),
  };

  const toggleBookCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleBookCategoriesVisibility());
  };

  const hideCategories = () => dispatch(hideBookCategories());

  const handleExitClick = () => {
    Cookies.remove(COOKIES.jwt);
    dispatch(removeUser());
    navigate(ROUTES.auth);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (!navListRef.current?.contains(target) || target.tagName === 'A') {
        dispatch(hideAppNav());
      }
    }

    if (isAppNavVisible) {
      document.body.addEventListener('click', handleClickOutside);
      disableScrolling(document.body);
    } else {
      enableScrolling(document.body);
    }

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, [isAppNavVisible, dispatch]);

  return (
    <nav className={complexStyles.mainNav}>
      <ul ref={navListRef} className={styles['main-nav__link-list']}>
        <li className={styles.link__item}>
          <NavLink
            to={ROUTES.books.all}
            className={({ isActive }) => (isActive ? styles.link_active : undefined)}
            data-test-id={
              window.innerWidth > SCREEN_SIZE_OF_MENU_TOGGLE_VISIBILITY ? 'navigation-showcase' : 'burger-showcase'
            }
          >
            <div onClick={toggleBookCategories}>
              Витрина книг
              {categories && (!allBooksStatus || allBooksStatus === QUERY_STATUSES.isSuccess) ? (
                <DropdownButton isDropped={isBookCategoriesVisible} />
              ) : null}
            </div>
          </NavLink>
          {categories && (!allBooksStatus || allBooksStatus === QUERY_STATUSES.isSuccess) ? (
            <BookCategories categories={categories} />
          ) : null}
        </li>
        <li className={styles.link__item}>
          <NavLink
            to={ROUTES.terms}
            className={({ isActive }) => (isActive ? styles.link_active : undefined)}
            onClick={hideCategories}
            data-test-id={
              window.innerWidth > SCREEN_SIZE_OF_MENU_TOGGLE_VISIBILITY ? 'navigation-terms' : 'burger-terms'
            }
          >
            Правила пользования
          </NavLink>
        </li>
        <li className={styles.link__item}>
          <NavLink
            to={ROUTES.contract}
            className={({ isActive }) => (isActive ? styles.link_active : undefined)}
            onClick={hideCategories}
            data-test-id={
              window.innerWidth > SCREEN_SIZE_OF_MENU_TOGGLE_VISIBILITY ? 'navigation-contract' : 'burger-contract'
            }
          >
            Договор оферты
          </NavLink>
        </li>
      </ul>
      <ul className={complexStyles.linksForUser}>
        <li className={styles.link__item}>
          <Link
            to={ROUTES.profile}
            data-test-id={window.innerWidth < SCREEN_SIZE_OF_MENU_TOGGLE_VISIBILITY ? 'profile-button' : undefined}
          >
            Профиль
          </Link>
        </li>
        <li className={styles.link__item}>
          <a onClick={handleExitClick} data-test-id='exit-button'>
            Выход
          </a>
        </li>
      </ul>
    </nav>
  );
};
