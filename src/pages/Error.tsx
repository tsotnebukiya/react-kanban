import { Fragment, useEffect } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { useAppSelector } from '../store';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.authenticated);
  useEffect(() => {
    !auth && navigate('/auth');
  }, [auth]);
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <h1>An error occured</h1>
      </main>
    </Fragment>
  );
};

export default ErrorPage;
