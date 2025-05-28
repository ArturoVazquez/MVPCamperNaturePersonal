import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { AuthContext } from '../context/AuthContextProvider';



// componentes publics
const Home = lazy(() => import('../pages/publicPages/Home/Home'));
const CamperNature = lazy(() =>
  import('../pages/PublicPages/CamperNature/CamperNature')
);
const Tarifas = lazy(() => import('../pages/PublicPages/Tarifas/Tarifas'));
const Reservas = lazy(() => import('../pages/PublicPages/Reservas/Reservas'));
const Login = lazy(() => import('../pages/PublicPages/Login/Login'));
const ForgetPassword = lazy(() =>
  import('../pages/PublicPages/ForgetPassword/ForgetPassword')
);
const ResetPassword = lazy(() =>
  import('../pages/PublicPages/ResetPassword/ResetPassword')
);
const Register = lazy(() => import('../pages/PublicPages/Register/Register'));
const Contact = lazy(() => import('../pages/PublicPages/Contact/Contact'));
const Verified = lazy(() => import('../pages/PublicPages/Verified/Verified'));
const Adventure = lazy(() =>
  import('../pages/PublicPages/Entorno/Adventure/Adventure')
);
const Culture = lazy(() =>
  import('../pages/PublicPages/Entorno/Culture/Culture')
);
const Nature = lazy(() => import('../pages/PublicPages/Entorno/Nature/Nature'));

//componentes user
const UserProfile = lazy(() =>
  import('../pages/UserPages/UserProfile/UserProfile')
);
const EditUser = lazy(() => import('../pages/UserPages/EditUser/EditUser'));
const Reserve_3 = lazy(()=> import('../pages/UserPages/Reserve/Reserve_3/Reserve_3'));

//componentes admin
const EditService = lazy(() =>
  import('../pages/AdminPages/EditService/EditService')
);
const CreateService = lazy(() =>
  import('../pages/AdminPages/CreateService/CreateService')
);
const UserList = lazy(() => import('../pages/AdminPages/UserList/UserList'));

export const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <BrowserRouter>
          <Suspense fallback={<h1>Where is my footer?</h1>}>
            <Routes>
              {/* RUTAS PÚBLICAS */}
              <Route element={<PublicRoutes />}>
                <Route element={<PublicLayout />}>
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forget-password" element={<ForgetPassword />} />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="/campernature" element={<CamperNature />} />
                  <Route path="/tarifas" element={<Tarifas />} />
                  <Route path="/reservas" element={<Reservas />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/verified" element={<Verified />} />
                  <Route path="/adventure" element={<Adventure />} />
                  <Route path="/culture" element={<Culture />} />
                  <Route path="/nature" element={<Nature />} />
                </Route>
              </Route>
              <Route
                element={
                  <PrivateRoutes userType={user?.user_type} requiredUser={1} />
                }
              >
                <Route element={<UserLayout />}>
                  <Route path="/user/profile" element={<UserProfile />} />
                  <Route
                    path="/user/editUserById"
                    element={<EditUser />}
                  />
                  <Route path='/user/reserve/reserve_3' element={<Reserve_3/>}/>
                  {/* AQUI VIENEN LAS COSAS DE LA COSAS DE LOS USERS*/}
                </Route>
              </Route>
              {/* RUTAS ADMIN SIN PROTECCIÓN */}
              <Route
                element={
                  <PrivateRoutes userType={user?.user_type} requiredUser={0} />
                }
              >
                <Route element={<AdminLayout />}>
                  <Route path="/admin/service" element={<CreateService />} />
                  {/* Agrega rutas de admin aquí si es necesario */}
                  <Route
                    path="/admin/editService/:id"
                    element={<EditService />}
                  />
                  <Route path="/admin/userList" element={<UserList />} />
                </Route>
              </Route>

              {/* pagina de no encontrar */}
              <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </>
  );
};
