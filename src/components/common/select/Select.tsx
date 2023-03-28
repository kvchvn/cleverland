import React, { useState } from 'react';
import classnames from 'classnames';

import styles from './Select.module.scss';

type SelectProps = {
  currentOption: string;
  options: string[];
  setValueFn: (value: string) => void;
};

export const Select = ({ currentOption, options, setValueFn }: SelectProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const complexStyles = {
    optionsList: classnames(styles['select__options-list'], { [styles.select_expanded]: isExpanded }),
    mainButton: classnames(styles['select__button-expand'], { [styles.select_expanded]: isExpanded }),
  };

  const handleClickButton = () => setIsExpanded((prevState) => !prevState);

  const handleClickOption = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    setValueFn(target.value);
    setIsExpanded(false);
  };

  return (
    <div className={styles['select-box']} data-test-id='month-select'>
      <button type='button' onClick={handleClickButton} className={complexStyles.mainButton}>
        {currentOption}
      </button>
      <ul className={complexStyles.optionsList}>
        {options.map((option, index) => {
          // in order to eslint has no complaints
          const key = index;

          return (
            <li key={option + key}>
              <button type='button' value={option} onClick={handleClickOption}>
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
