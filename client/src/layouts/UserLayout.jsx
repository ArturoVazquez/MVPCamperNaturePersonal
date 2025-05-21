import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarProvisional } from '../components/NavbarProvisional/NavbarProvisional';
export const UserLayout = () => {
  return (
    <>
      <header>
        <NavbarProvisional />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
