import { Link, Form } from 'react-router-dom';
import { useAppSelector } from '../store';

const MainNavigation: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.authenticated);
  return (
    <header className="bg-gray-700">
      <nav className="flex justify-around  mb-2 py-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
        {isAuth && (
          <Form action="/logout" method="post">
            <button className="bg-green-600 rounded-md m-5 p-5">Logout</button>
          </Form>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
