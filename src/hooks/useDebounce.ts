import { useEffect } from 'react';

export const useDebounce = <TArgs extends []>(memoizedCallback: (...args: TArgs) => void, delay = 300) => {
  useEffect(() => {
    const timerId = setTimeout(memoizedCallback, delay);

    return () => clearTimeout(timerId);
  }, [memoizedCallback, delay]);
};
