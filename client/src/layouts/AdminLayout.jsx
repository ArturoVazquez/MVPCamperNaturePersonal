import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '../components/Navbars/AdminNavbar';

export const AdminLayout = () => {
  return (
    <>
      <header>
        <AdminNavbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
