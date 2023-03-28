import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../constants';
import { Wrapper } from '../../global/wrapper';

import styles from './NotFoundView.module.scss';

export const NotFoundView = () => (
  <section className={styles['not-found-section']}>
    <Wrapper>
      <h2>404</h2>
      <h4>Страница не найдена :(</h4>
      <button type='button'>
        <Link to={ROUTES.main}>Перейти на главную страницу</Link>
      </button>
    </Wrapper>
  </section>
);
