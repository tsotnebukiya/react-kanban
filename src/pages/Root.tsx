import { Fragment, useEffect, useState } from 'react';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import store, { useAppSelector } from '../store';

const RootLayout: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.authenticated);
  useEffect(() => {
    if (!auth) {
      navigate('/auth');
    }
  }, [auth]);
  return (
    <div className="flex h-screen w-screen">
      <MainNavigation />
      <Outlet />
    </div>
  );
};

export default RootLayout;

export async function loader() {}
