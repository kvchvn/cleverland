import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { LOADING_ATTRIBUTE } from '../../../constants';
import { disableScrolling, enableScrolling } from '../../../helpers';
import { ModalWrapperType } from '../../../types';

import styles from './ModalWrapper.module.scss';

type ModalWrapperProps = {
  children: React.ReactNode;
  closeFn: () => void;
  isOpened: boolean;
  type: ModalWrapperType;
};

export const ModalWrapper = ({ children, closeFn, isOpened, type }: ModalWrapperProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!sectionRef.current?.contains(target)) {
        closeFn();
      }
    };

    if (isOpened) {
      document.body.addEventListener('click', handleClickOutside);
      disableScrolling(document.body);
    }

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
      if (!document.body.hasAttribute(LOADING_ATTRIBUTE)) {
        enableScrolling(document.body);
      }
    };
  }, [closeFn, isOpened]);

  return createPortal(
    <div className={styles['modal-wrapper__overlay']} data-test-id='modal-outer'>
      <section
        ref={sectionRef}
        className={styles['modal-wrapper__main-section']}
        data-test-id={type === 'booking' ? 'booking-modal' : 'modal-rate-book'}
      >
        {children}
        <button
          type='button'
          onClick={closeFn}
          className={styles['modal-wrapper__button-close']}
          data-test-id='modal-close-button'
        />
      </section>
    </div>,
    document.body
  );
};
