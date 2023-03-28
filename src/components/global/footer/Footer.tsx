import React from 'react';

import { Wrapper } from '../wrapper';

import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <Wrapper>
      <p>&copy; 2020-2023 Cleverland. Все права защищены.</p>
      <ul className={styles.footer__socials}>
        <li className={styles.socials_facebook} />
        <li className={styles.socials_instagram} />
        <li className={styles.socials_vk} />
        <li className={styles.socials_linkedin} />
      </ul>
    </Wrapper>
  </footer>
);
