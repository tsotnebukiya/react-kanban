import { redirect } from 'react-router-dom';
import store from '../store';
import { logout } from '../store/auth';

export const action = async () => {
  await store.dispatch(logout());
  return redirect('/auth');
};
