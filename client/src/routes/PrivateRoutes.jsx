/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';

export const PrivateRoutes = ({ userType, requiredUser }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType !== requiredUser) {
      navigate('/');
    }
  }, [user]);

  return <>{user && <Outlet />}</>;
};
