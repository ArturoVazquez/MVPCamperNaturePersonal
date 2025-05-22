import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { PrivateRoutes } from './PrivateRoutes';




// componentes publics
const Home = lazy(() => import('../pages/publicPages/Home/Home'));
const CamperNature = lazy(() => import("../pages/PublicPages/CamperNature/CamperNature"))
const Tarifas = lazy(() => import("../pages/PublicPages/Tarifas/Tarifas"))
const Entorno = lazy(() => import("../pages/PublicPages/Entorno/Entorno"))
const Reservas = lazy(() => import("../pages/PublicPages/Reservas/Reservas"))
const Contact = lazy(() => import('../pages/PublicPages/Contact/Contact'));


//componentes user
const UserProfile = lazy(() => import('../pages/UserPages/UserProfile/UserProfile'));
const EditUser = lazy(() => import('../pages/UserPages/EditUser/EditUser'));
const Login = lazy(() => import('../pages/PublicPages/Login/Login'));
const Register = lazy(() => import('../pages/PublicPages/Register/Register'));
//componentes admin

const EditService = lazy(() => import('../pages/AdminPages/EditService/EditService'));



export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Marina cagando...</h1>}>
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/campernature" element={<CamperNature/>} />
            <Route path ="/tarifas" element={<Tarifas/>} />
            <Route path ="/entorno" element={<Entorno/>} />
            <Route path ="/reservas" element={<Reservas/>} />
            <Route path="/contact" element={<Contact />} />
          </Route>



          <Route element={<PublicRoutes />}>
            <Route element={<PublicLayout />}>
              {/* AQUI VIENEN LAS COSAS DE LA COSAS */}
               <Route path='/register' element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            
            </Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route element={<UserLayout />}>
              <Route path="/user/profile" element={<UserProfile />} />
              <Route
                path="/user/editUserById/:user_id"
                element={<EditUser />}
              />
              {/* AQUI VIENEN LAS COSAS DE LA COSAS DE LOS USERS*/}
            </Route>
          </Route>

          {/* RUTAS ADMIN SIN PROTECCIÓN */}
          <Route element={<AdminLayout />}>
            {/* Agrega rutas de admin aquí si es necesario */}
      
            <Route path="/admin/editService/:id" element={<EditService />} />
            
           
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
