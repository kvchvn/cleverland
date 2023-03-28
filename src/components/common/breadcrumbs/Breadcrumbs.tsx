import React from 'react';
import { Link } from 'react-router-dom';

import { Wrapper } from '../../global/wrapper';

import styles from './Breadcrumbs.module.scss';

type BreadcrumbsProps = {
  paths: Array<{ name?: string; path?: string }>;
};

export const Breadcrumbs = ({ paths }: BreadcrumbsProps) => (
  <section className={styles['breadcrumbs-section']}>
    <Wrapper>
      {paths.map(
        ({ name, path }, index) =>
          name && (
            <React.Fragment key={name}>
              {path ? (
                <Link to={path} data-test-id='breadcrumbs-link'>
                  {name}
                </Link>
              ) : (
                <p data-test-id='book-name'>{name}</p>
              )}
              {index !== paths.length - 1 && <span>|</span>}
            </React.Fragment>
          )
      )}
    </Wrapper>
  </section>
);
