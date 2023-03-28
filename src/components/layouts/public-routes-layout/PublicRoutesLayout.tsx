import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../../../constants';
import { isUserAuthorized } from '../../../helpers';

export const PublicRoutesLayout = () => (isUserAuthorized() ? <Navigate to={ROUTES.main} /> : <Outlet />);
