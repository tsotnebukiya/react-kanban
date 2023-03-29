import { useEffect } from 'react';
import {
  ActionFunctionArgs,
  redirect,
  json,
  useNavigate,
} from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AuthLayout from '../layouts/AuthLayout';
import store, { useAppSelector } from '../store';
import { login, signup } from '../store/auth';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.authenticated);
  useEffect(() => {
    if (auth) {
      console.log('navigating to / in useState');
      navigate('/');
    }
  }, [auth]);
  return (
    <AuthLayout>
      <AuthForm />
    </AuthLayout>
  );
};

export default AuthPage;

export interface authActionData {
  error: boolean;
  header: string;
  message: any;
}

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  const formData = await request.formData();
  const authData = {
    email: formData.get('email')!.toString(),
    password: formData.get('password')!.toString(),
  };

  if (mode === 'forgot') {
    return null;
  }
  if (mode === 'signup') {
    await store.dispatch(signup(authData));
  }
  if (mode === 'login') {
    await store.dispatch(login(authData));
  }
  const error = store.getState().auth.error;
  if (error) {
    return json<authActionData>(
      { error: true, message: error.message, header: error.header },
      {
        status: 401,
      }
    );
  }
  return null;
}
