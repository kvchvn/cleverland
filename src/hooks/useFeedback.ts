import { useCallback, useRef } from 'react';

import { useAddFeedbackMutation, useUpdateFeedbackMutation } from '../store';
import { AddFeedbackRequestBody, ToastActions } from '../types';

type UseFeedbackArgs = {
  effect: () => void;
};

export const useFeedback = ({ effect }: UseFeedbackArgs) => {
  const actionName = useRef<ToastActions.AddFeedback | ToastActions.UpdateFeedback>();

  const [
    addFeedback,
    {
      isLoading: isLoadingAddFeedback,
      isError: isErrorAddFeedback,
      isSuccess: isSuccessAddFeedback,
      reset: resetAddFeedbackStatus,
    },
  ] = useAddFeedbackMutation();
  const [
    updateFeedback,
    {
      isLoading: isLoadingUpdateFeedback,
      isError: isErrorUpdateFeedback,
      isSuccess: isSuccessUpdateFeedback,
      reset: resetUpdateFeedbackStatus,
    },
  ] = useUpdateFeedbackMutation();

  const handleFeedbackAddition = useCallback(
    async ({ data }: AddFeedbackRequestBody) => {
      resetUpdateFeedbackStatus();
      actionName.current = ToastActions.AddFeedback;
      try {
        await addFeedback({ data }).unwrap();
      } catch (err) {
        console.error('Error with feedback addition! ', err);
      } finally {
        effect();
      }
    },
    [addFeedback, effect, resetUpdateFeedbackStatus]
  );

  const handleFeedbackUpdating = useCallback(
    async ({ data, commentId }: { data: AddFeedbackRequestBody['data']; commentId: string }) => {
      resetAddFeedbackStatus();
      actionName.current = ToastActions.UpdateFeedback;
      try {
        await updateFeedback({ data, commentId }).unwrap();
      } catch (err) {
        console.error('Error with feedback editing! ', err);
      } finally {
        effect();
      }
    },
    [updateFeedback, effect, resetAddFeedbackStatus]
  );

  return {
    actions: { addFeedback: handleFeedbackAddition, updateFeedback: handleFeedbackUpdating },
    status: {
      isLoading: isLoadingAddFeedback || isLoadingUpdateFeedback,
      isError: isErrorAddFeedback || isErrorUpdateFeedback,
      isSuccess: isSuccessAddFeedback || isSuccessUpdateFeedback,
      actionName: actionName.current,
    },
  };
};
