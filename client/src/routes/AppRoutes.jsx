import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';

const Home = lazy(() => import('../pages/PublicPages/Home/Home'));
const Register = lazy(() => import('../pages/PublicPages/Register/Register'));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Marina cagando...</h1>}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route element={<PublicLayout />}>
              {/* AQUI VIENEN LAS COSAS DE LA COSAS */}
               <Route path='/register' element={<Register />} />
              <Route path="/" element={<Home />} />
            </Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route element={<UserLayout />}>
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
