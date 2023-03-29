import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from './store';
import { routes } from './router';
import { AuthState } from './store/auth';
import useAuthState from './components/AuthState';

const App = () => {
  const authChecked = useAuthState();
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [darkMode]);
  if (!authChecked) {
    return;
  }
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
