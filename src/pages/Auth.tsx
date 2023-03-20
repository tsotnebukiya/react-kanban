import { SignInMethod } from 'firebase/auth';
import { useEffect } from 'react';
import {
  ActionFunctionArgs,
  useSearchParams,
  redirect,
  useNavigate,
} from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import ForgotForm from '../components/ForgotForm';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import store, { useAppSelector } from '../store';
import { login } from '../store/auth';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth.authenticated);

  useEffect(() => {
    auth && navigate('/');
  }, [auth]);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';

  return (
    <AuthLayout mode={mode}>
      {isLogin && <LoginForm />}
      {isForgot && <ForgotForm />}
      {isSignup && <SignupForm />}
    </AuthLayout>
  );
};

export default AuthPage;

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const email = data.get('email') as string;
  const password = data.get('password') as string;
  store.dispatch(login({ email, password }));
  return null;
}

export async function loader() {
  const state = store.getState();
  if (state.auth.authenticated) {
    return redirect('/');
  } else {
    return null;
  }
}
