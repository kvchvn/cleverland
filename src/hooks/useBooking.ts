import { useCallback, useRef } from 'react';

import {
  useBookForBookingSelector,
  useBookingDateISOSelector,
  useResetBookingMutation,
  useSetBookingMutation,
  useUpdateBookingMutation,
  useUserSelector,
} from '../store';
import { ToastActions } from '../types';

type UseBookingArgs = {
  effect: () => void;
};

export const useBooking = ({ effect }: UseBookingArgs) => {
  const actionName = useRef<ToastActions.SetBooking | ToastActions.UpdateBooking | ToastActions.ResetBooking>();
  const bookingDateISO = useBookingDateISOSelector();
  const book = useBookForBookingSelector();
  const user = useUserSelector();

  const [
    setBooking,
    {
      isUninitialized: isUninitializedSetBooking,
      isLoading: isLoadingSetBooking,
      isError: isErrorSetBooking,
      isSuccess: isSuccessSetBooking,
      reset: resetSetBooking,
    },
  ] = useSetBookingMutation();
  const [
    resetBooking,
    {
      isUninitialized: isUninitializedResetBooking,
      isLoading: isLoadingResetBooking,
      isError: isErrorResetBooking,
      isSuccess: isSuccessResetBooking,
      reset: resetResetBooking,
    },
  ] = useResetBookingMutation();
  const [
    updateBooking,
    {
      isUninitialized: isUninitializedUpdateBooking,
      isLoading: isLoadingUpdateBooking,
      isError: isErrorUpdateBooking,
      isSuccess: isSuccessUpdateBooking,
      reset: resetUpdateBooking,
    },
  ] = useUpdateBookingMutation();

  const resetStatus = useCallback(() => {
    if (!isUninitializedSetBooking) {
      resetSetBooking();
    }
    if (!isUninitializedUpdateBooking) {
      resetUpdateBooking();
    }
    if (!isUninitializedResetBooking) {
      resetResetBooking();
    }
  }, [
    isUninitializedSetBooking,
    isUninitializedUpdateBooking,
    isUninitializedResetBooking,
    resetSetBooking,
    resetUpdateBooking,
    resetResetBooking,
  ]);

  const handleSetBooking = useCallback(async () => {
    if (bookingDateISO && book && user) {
      resetStatus();
      actionName.current = ToastActions.SetBooking;
      try {
        await setBooking({
          dateOrder: bookingDateISO,
          book: String(book.id),
          customer: String(user.id),
        }).unwrap();
      } catch (err) {
        console.error('Error with booking setting! ', err);
      } finally {
        effect();
      }
    }
  }, [book, bookingDateISO, effect, resetStatus, setBooking, user]);

  const handleResetBooking = useCallback(async () => {
    if (user && book?.booking) {
      resetStatus();
      actionName.current = ToastActions.ResetBooking;
      try {
        await resetBooking({
          bookingId: String(book.booking.id),
          bookId: String(book.id),
        }).unwrap();
      } catch (err) {
        console.error('Error with booking resetting! ', err);
      } finally {
        effect();
      }
    }
  }, [effect, resetBooking, resetStatus, book?.booking, book?.id, user]);

  const handleUpdateBooking = useCallback(async () => {
    if (bookingDateISO && user && book?.booking && book.booking.dateOrder !== bookingDateISO) {
      resetStatus();
      actionName.current = ToastActions.UpdateBooking;
      try {
        await updateBooking({
          bookingId: String(book.booking.id),
          dateOrder: bookingDateISO,
          book: String(book.id),
          customer: String(user.id),
        });
      } catch (err) {
        console.error('Error with booking updating! ', err);
      } finally {
        effect();
      }
    }
  }, [book?.booking, book?.id, bookingDateISO, effect, resetStatus, updateBooking, user]);

  return {
    actions: {
      setBooking: handleSetBooking,
      updateBooking: handleUpdateBooking,
      resetBooking: handleResetBooking,
      resetStatus,
    },
    status: {
      isLoading: isLoadingSetBooking || isLoadingUpdateBooking || isLoadingResetBooking,
      isError: isErrorSetBooking || isErrorUpdateBooking || isErrorResetBooking,
      isSuccess: isSuccessSetBooking || isSuccessUpdateBooking || isSuccessResetBooking,
      actionName: actionName.current,
    },
  };
};
