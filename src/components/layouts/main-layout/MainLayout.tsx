import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../../global/footer';
import { Header } from '../../global/header';

export const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
