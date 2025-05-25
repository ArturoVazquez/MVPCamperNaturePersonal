import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarPublic } from '../components/Navbars/NavbarPublic';

export const PublicLayout = () => {
  return (
    <>
      <header>
        <NavbarPublic />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
