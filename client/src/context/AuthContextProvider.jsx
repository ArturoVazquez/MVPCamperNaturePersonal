import React, { useState } from 'react';
import { createContext } from 'react';
import { fetchData } from '../helpers/axiosHelper';

export const AuthContext = createContext();





const login = async (loginData) =>{
  const responseToken = await fetchData("user/login", "post", loginData);
  console.log('responseToken', responseToken);
  let tokenBack = responseToken.data.token;
  const responseUser = await fetchData("user/userById", "get",null,tokenBack);
  console.log('responseUser', responseUser);
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  return (
   <AuthContext.Provider value={{
            user,
            setUser,
            login

   }}>
    {children}
    </AuthContext.Provider>
  )
};
