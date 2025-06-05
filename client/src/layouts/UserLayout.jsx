import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserNavbar } from '../components/Navbars/UserNavbar';
import Footer from '../components/Footer/footer';

export const UserLayout = () => {
  return (
    <>
      <header>
        <UserNavbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
