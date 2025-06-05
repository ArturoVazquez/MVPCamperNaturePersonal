import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { fetchData } from '../helpers/axiosHelper';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tokenLS = localStorage.getItem('token');
    if (tokenLS) {
      const fetchUser = async () => {
        try {
          const result = await fetchData('user/userById', 'get', null, tokenLS);
          let userBack = result.data.userLogged;
          setToken(tokenLS);
          setUser(userBack);
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (loginData) => {
    const responseToken = await fetchData('user/login', 'post', loginData);
    let tokenBack = responseToken.data.token;

    const responseUser = await fetchData(
      'user/userById',
      'get',
      null,
      tokenBack
    );
    let userBack = responseUser.data.userLogged;
    localStorage.setItem('token', tokenBack);
    setToken(tokenBack);
    setUser(userBack);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser();
    setToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        token,
        setToken,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
