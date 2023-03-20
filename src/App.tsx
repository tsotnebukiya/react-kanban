import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';
import AuthPage from './pages/Auth';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import TasksPage from './pages/Tasks';
import { action as authAction } from './pages/Auth';
import { action as logoutAction } from './pages/Logout';
import { loader as loaderRoot } from './pages/Root';
import { loader as loaderAuth } from './pages/Auth';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './firebase';
import { useAppDispatch, useAppSelector } from './store';
import { authActions } from './store/auth';

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    loader: loaderRoot,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'tasks', element: <TasksPage /> },
    ],
  },
  {
    path: 'auth',
    element: <AuthPage />,
    action: authAction,
    loader: loaderAuth,
  },
  { path: 'logout', action: logoutAction },
];
const router = createBrowserRouter(routes);

const App = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authActions.loggedIn({
            displayName: user.displayName,
            email: user.email,
          })
        );
      } else {
        dispatch(authActions.loggedOut());
      }
      setAuthChecked(true);
    });
    return unsubscribe;
  }, [darkMode]);

  if (!authChecked) {
    return null;
  }

  return <RouterProvider router={router} />;
};

export default App;
