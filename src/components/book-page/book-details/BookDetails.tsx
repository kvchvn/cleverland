import React from 'react';

import { BOOK_DETAILED_INFO_LABELS } from '../../../constants';
import { BookDetailsModified } from '../../../types';

import styles from './BookDetails.module.scss';

type BookDetailsProps = {
  details?: BookDetailsModified;
};

export const BookDetails = ({ details }: BookDetailsProps) =>
  details ? (
    <ul className={styles['detailed-info__list']}>
      {Object.entries(BOOK_DETAILED_INFO_LABELS).map(([label, labelText]) => (
        <li key={label}>
          {details[label as keyof typeof details] && (
            <>
              <span>{labelText}</span>
              {details[label as keyof typeof details]}
            </>
          )}
        </li>
      ))}
    </ul>
  ) : null;
