import { RouteObject } from 'react-router-dom';
import AuthPage, { action as authAction } from './pages/Auth';
import { action as logoutAction } from './pages/Logout';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import DashboardPage from './pages/Dashboard';
import TasksPage from './pages/Tasks';
import TaskItemPage, { loader as TaskItemLoader } from './pages/TaskItem';

export const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: 'tasks',
        children: [
          { index: true, element: <TasksPage /> },
          {
            path: ':taskId',
            id: 'task-id',
            element: <TaskItemPage />,
            loader: TaskItemLoader,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthPage />,
    action: authAction,
  },
  { path: 'logout', action: logoutAction },
];
