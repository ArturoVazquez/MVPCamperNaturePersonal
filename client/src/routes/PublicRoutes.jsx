/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';

export const PublicRoutes = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirigir solo si está en login o en la raíz
    if (user) {
      if (location.pathname === '/login') {
        if (user.user_type === 1) {
          navigate('/user/profile');
        } 
      }

      if (user.user_type === 0) {
          navigate('/admin/reserves');
      }
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );

};
