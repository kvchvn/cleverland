import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ScrollToTop } from '../components/global/scroll-to-top';
import { AuthLayout } from '../components/layouts/auth-layout';
import { MainLayout } from '../components/layouts/main-layout';
import { PrivateRoutesLayout } from '../components/layouts/private-routes-layout';
import { PublicRoutesLayout } from '../components/layouts/public-routes-layout';
import { ROUTES } from '../constants';
import { AuthPage } from '../pages/auth';
import { BookPage } from '../pages/book';
import { MainPage } from '../pages/main';
import { NotFoundPage } from '../pages/not-found';
import { PasswordRecoveryPage } from '../pages/password-recovery';
import { ProfilePage } from '../pages/profile';
import { RegistrationPage } from '../pages/registration';
import { TermsPage } from '../pages/terms';

export const Router = () => (
  <HashRouter>
    <ScrollToTop>
      <Routes>
        <Route path={ROUTES.main} element={<MainLayout />}>
          <Route path={ROUTES.main} element={<PrivateRoutesLayout />}>
            <Route index={true} element={<Navigate to={ROUTES.books.all} />} />
            <Route path={ROUTES.books.base} element={<Navigate to={ROUTES.books.all} />} />
            <Route path={ROUTES.books.category} element={<MainPage />} />
            <Route path={ROUTES.books.specificBook} element={<BookPage />} />
            <Route path={ROUTES.terms} element={<TermsPage view='terms' />} />
            <Route path={ROUTES.contract} element={<TermsPage view='contract' />} />
            <Route path={ROUTES.profile} element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path={ROUTES.main} element={<AuthLayout />}>
          <Route path={ROUTES.main} element={<PublicRoutesLayout />}>
            <Route path={ROUTES.auth} element={<AuthPage />} />
            <Route path={ROUTES.registration} element={<RegistrationPage />} />
            <Route path={ROUTES.passwordRecovery} element={<PasswordRecoveryPage />} />
          </Route>
        </Route>
        <Route path={ROUTES.notFound} element={<NotFoundPage />} />
      </Routes>
    </ScrollToTop>
  </HashRouter>
);
