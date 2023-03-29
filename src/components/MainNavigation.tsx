import { Link, Form } from 'react-router-dom';
import { useAppSelector } from '../store';
import MenuItem from './MenuItem';
import HomeIcon from './SVG/HomeIcon';
import SettingsIcon from './SVG/SettingsIcon';
import TasksIcon from './SVG/TasksIcon';

const dropdown = [
  { path: '/tasks/5', name: 'Task 5' },
  { path: '/tasks/10', name: 'Task 10' },
];

const MainNavigation: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.authenticated);
  return (
    <div className="">
      <div className=" hidden w-64 flex-shrink-0 md:flex overflow-y-auto py-5 px-3 flex-col h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <ul className="space-y-2">
          <MenuItem path="/" icon={<HomeIcon />}>
            Home
          </MenuItem>
          <MenuItem path="tasks" icon={<TasksIcon />} dropdown={dropdown}>
            Tasks
          </MenuItem>
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <MenuItem path="/efe" icon={<SettingsIcon />}>
            Settings
          </MenuItem>
        </ul>
        <div className="justify-center p-4 space-x-4 w-full flex bg-white dark:bg-gray-800 z-20 mt-auto">
          <button className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
            <SettingsIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
