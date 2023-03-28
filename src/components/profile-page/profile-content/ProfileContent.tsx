import React from 'react';

import { useUserSelector } from '../../../store';
import { ProfileAvatar } from '../profile-avatar';
import { ProfileBooksManagement } from '../profile-books-management';
import { ProfileForm } from '../profile-form';

import styles from './ProfileContent.module.scss';

export const ProfileContent = () => {
  const user = useUserSelector();

  return (
    <section className={styles['profile_main-section']}>
      <div className={styles['profile_user-bio']} data-test-id='profile-avatar'>
        <ProfileAvatar />
        <h1>
          {user?.lastName ? (
            <>
              {user.lastName}
              <br />
            </>
          ) : null}
          {user && user.firstName}
        </h1>
      </div>
      {user && (
        <>
          <ProfileForm />
          <ProfileBooksManagement />
        </>
      )}
    </section>
  );
};
