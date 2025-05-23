/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';

export const PublicRoutes = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(user){
      if(user.user_type === 1){
        navigate('/user/profile')
      } else if (user.user_type === 0){
        navigate('/admin/service')
      }
    }
  },[user])

  return (
    <>
      {!user && <Outlet />}
    </>
  )
};
