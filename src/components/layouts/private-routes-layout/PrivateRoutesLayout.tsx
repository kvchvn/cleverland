import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../../../constants';
import { isUserAuthorized } from '../../../helpers';

export const PrivateRoutesLayout = () => (isUserAuthorized() ? <Outlet /> : <Navigate to={ROUTES.auth} />);
