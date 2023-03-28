import { useSelector } from 'react-redux';

import { Nullable, User } from '../../types';
import { RootState } from '../store';

export const useUserSelector = (): Nullable<User> => useSelector((state: RootState) => state.user.data);
