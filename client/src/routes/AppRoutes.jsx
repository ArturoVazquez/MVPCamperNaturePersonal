import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from "./PublicRoutes"
import { PublicLayout } from '../layouts/PublicLayout';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';


const Home = lazy(() => import('../pages/publicPages/Home/Home'));

const EditUser = lazy(() => import('../pages/UserPages/EditUser'));

const Contact = lazy(() => import('../pages/PublicPages/Contact/Contact'));


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Marina cagando...</h1>}>
        <Routes>

          {/* RUTAS PÚBLICAS */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          

          <Route element={<PublicRoutes />}>
            <Route element={<PublicLayout />}>
              {/* AQUI VIENEN LAS COSAS DE LA COSAS */}
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

          </Route>

          {/* RUTAS USUARIO SIN PROTECCIÓN */}
          <Route element={<UserLayout />}>
            <Route path="/user/editUserById/:user_id" element={<EditUser />} />
          </Route>

          {/* RUTAS ADMIN SIN PROTECCIÓN */}
          <Route element={<AdminLayout />}>
            {/* Agrega rutas de admin aquí si es necesario */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};