import { Fragment, useEffect } from 'react';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import store, { useAppSelector } from '../store';

const RootLayout: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.authenticated);
  useEffect(() => {
    !auth && navigate('/auth');
  }, [auth]);
  return (
    <Fragment>
      <MainNavigation />
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;

export async function loader() {
  const state = store.getState();
  if (state.auth.authenticated) {
    return null;
  } else {
    return redirect('/auth');
  }
}
