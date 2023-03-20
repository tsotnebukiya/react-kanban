import { redirect } from 'react-router-dom';
import store, { useAppDispatch } from '../store';
import { logout } from '../store/auth';

export interface LogoutProps {}

const Logout: React.FC<LogoutProps> = (props) => {
  return <div></div>;
};

export default Logout;

export const action = async () => {
  store.dispatch(logout());
  return redirect('/');
};
