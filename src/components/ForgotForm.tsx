import { useRef } from 'react';
import { useSearchParams, Link, Form } from 'react-router-dom';
import Input from './Input';
import Label from './Label';

export interface ForgotFormProps {}

const ForgotForm: React.FC<ForgotFormProps> = (props) => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get('mode') === 'signup';
  return (
    <Form method="post" className="space-y-4 md:space-y-6">
      <div>
        <Label htmlFor="email">Your email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
          required
          ref={emailInput}
        />
      </div>
      <div>
        <Label htmlFor="password">Your password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required
          ref={passwordInput}
        />
      </div>
      <div className="flex items-center justify-between">
        <Link
          to="?mode=forgot"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Forgot password?
        </Link>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Sign in
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{' '}
        <Link
          to="?mode=signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign Up
        </Link>
      </p>
    </Form>
  );
};

export default ForgotForm;
