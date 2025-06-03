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

const Reserve = lazy(() =>
  import('../pages/UserPages/Reserve/ReservePadre/ReservePadre')
);

const EditReserve = lazy(() =>
  import('../pages/UserPages/EditReserveUser/EditReserveUser')
);

//componentes admin
const EditService = lazy(() =>
  import('../pages/AdminPages/EditService/EditService')
);
const CreateService = lazy(() =>
  import('../pages/AdminPages/CreateService/CreateService')
);
const UserList = lazy(() => import('../pages/AdminPages/UserList/UserList'));
const Reserves = lazy(()=>import('../pages/AdminPages/Reserves/Reserves'));
const EditReserveAdmin = lazy(()=> import('../pages/AdminPages/EditReserveAdmin/EditReserveAdmin'));


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
                    path="/user/editReserve/:id"
                    element={<EditReserve />}
                  />
                  <Route path="/user/editUserById" element={<EditUser />} />
                  <Route path="/user" element={<Home />} />
                  <Route path="/user/campernature" element={<CamperNature />} />
                  <Route path="/user/tarifas" element={<Tarifas />} />
                  <Route path="/user/contact" element={<Contact />} />
                  <Route path="/user/adventure" element={<Adventure />} />
                  <Route path="/user/culture" element={<Culture />} />
                  <Route path="/user/nature" element={<Nature />} />
                  <Route path="/user/reserve" element={<Reserve />} />
                </Route>
              </Route>
              <Route
                element={
                  <PrivateRoutes userType={user?.user_type} requiredUser={0} />
                }
              >
                <Route element={<AdminLayout />}>
                  <Route path="/admin/service" element={<CreateService />} />
                  <Route
                    path="/admin/editService/:id"
                    element={<EditService />}
                  />
                  <Route path="/admin/userList" element={<UserList />} />
                  <Route path='/admin/reserves' element={<Reserves/>}/>
                  <Route path='/admin/EditReserveAdmin/:booking_id' element={<EditReserveAdmin/>}/>
                </Route>
              </Route>
              <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </>
  );
};
