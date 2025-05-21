import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';

//componentes publicos
const Home = lazy(() => import('../pages/publicPages/Home/Home'));

//componentes user
const UserProfile = lazy(() => import('../pages/UserProfile/UserProfile'));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Marina cagando...</h1>}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route element={<PublicLayout />}>
              {/* AQUI VIENEN LAS COSAS DE LA COSAS */}
              <Route path="/" element={<Home />} />
            </Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route element={<UserLayout />}>
              <Route path="/user/profile" element={<UserProfile />} />
              {/* AQUI VIENEN LAS COSAS DE LA COSAS DE LOS USERS*/}
            </Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route element={<AdminLayout />}>
              {/* AQUI VIENEN LAS COSAS DE LA COSAS DE LOS ADMINS*/}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
