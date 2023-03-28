import React, { HTMLInputTypeAttribute, ReactNodeArray, useCallback, useState } from 'react';
import stringReplace from 'react-string-replace';

import { CHECK_FN_DEFAULT_OPTIONS, PASSWORD_MIN_LENGTH } from '../constants';
import { check } from '../helpers';
import { InputBoxStepByStepValidationProp } from '../types';

import styles from '../components/common/input-box/InputBox.module.scss';

type UseStepByStepValidationArgs = {
  inputType: HTMLInputTypeAttribute;
  initialHintText?: string;
  stepByStepValidationRules?: InputBoxStepByStepValidationProp;
};

type HintState = {
  text?: string | React.ReactNodeArray;
  visibility: boolean;
};

export const useStepByStepValidation = ({
  inputType,
  initialHintText,
  stepByStepValidationRules,
}: UseStepByStepValidationArgs) => {
  const [hint, setHint] = useState<HintState>(() => {
    let hintText: string | ReactNodeArray | undefined = initialHintText;

    if (stepByStepValidationRules && initialHintText) {
      stepByStepValidationRules.forEach(({ stringSlice }) => {
        hintText = stringReplace(hintText, stringSlice, (match, i) => <span key={stringSlice + i}>{stringSlice}</span>);
      });
    }

    return { text: hintText, visibility: true };
  });

  const handleChangeWithStepByStepValidations = useCallback(
    (value: string) => {
      if (stepByStepValidationRules && hint.text) {
        // logic of step-by-step validation and representing it onto assistive text
        const options = CHECK_FN_DEFAULT_OPTIONS;

        if (inputType === 'password') {
          options.requiredLength = PASSWORD_MIN_LENGTH;
        }

        try {
          stepByStepValidationRules.forEach(({ type, stringSlice }) => {
            if (!check(value, options)[type]) {
              // highlight error assistiveText
              setHint((prevHint) => {
                if (prevHint.text && Array.isArray(prevHint.text)) {
                  return {
                    ...prevHint,
                    visibility: true,
                    text: prevHint.text.map((elem) => {
                      if (typeof elem === 'object' && (elem as React.ReactElement).props.children === stringSlice) {
                        return (
                          <span key={stringSlice} className={styles.error}>
                            {stringSlice}
                          </span>
                        );
                      }

                      return elem;
                    }),
                  };
                }

                return prevHint;
              });
            } else if (Array.isArray(hint.text)) {
              // remove highlighting
              setHint((prevHint) => ({
                ...prevHint,
                visibility: true,
                text: (prevHint.text as React.ReactNodeArray).map((elem) => {
                  if (typeof elem === 'object' && (elem as React.ReactElement).props.children === stringSlice) {
                    return <span key={stringSlice}>{stringSlice}</span>;
                  }

                  return elem;
                }),
              }));
            }
          });
        } catch (err) {
          console.error('Error with step by step validation! ', err);
        }
      }
    },
    [hint.text, inputType, stepByStepValidationRules]
  );

  return { hint, setHint, handleChangeWithStepByStepValidations };
};
