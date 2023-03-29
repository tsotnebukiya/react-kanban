import { Fragment, useEffect, useRef, useState } from 'react';
import {
  useSearchParams,
  Form,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import { AuthVariable } from '../utils/AuthVariable';
import { authActionData } from '../pages/Auth';
import Button from './UI/Button';
import Input from './UI/Input';
import Label from './UI/Label';
import LinkTo from './UI/LinkTo';
import ErrorModal from './ErrorModal';

export interface AuthFormProps {}

const AuthForm: React.FC<AuthFormProps> = () => {
  const [errorModal, setErrorModal] = useState(false);
  const actionData = useActionData() as authActionData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [searchParams] = useSearchParams();
  const params = searchParams.get('mode');
  let mode: 'login' | 'signup' | 'forgot';
  if (params !== 'forgot' && params !== 'signup' && params != 'login') {
    mode = 'login';
  } else {
    mode = params;
  }
  const authVariable = new AuthVariable(mode);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    actionData && actionData.error && setErrorModal(true);
  }, [actionData]);
  const closeModal = () => {
    console.log('hey');
    setErrorModal(false);
  };

  return (
    <Fragment>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
        {authVariable.header}
      </h1>
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
        {!authVariable.forgot && (
          <div>
            <Label htmlFor="password">Your password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              minLength={6}
              ref={passwordInput}
            />
          </div>
        )}
        {
          <div className="flex items-center justify-between">
            <LinkTo to={authVariable.upperLinkPath}>
              {authVariable.upperLink}
            </LinkTo>
          </div>
        }
        <Button type="submit" disabled={isSubmitting} className="blue">
          {isSubmitting ? 'Submitting' : authVariable.buttonText}
        </Button>
        {!authVariable.forgot && (
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {authVariable.lowerText}
            <LinkTo to={authVariable.lowerLinkPath}>
              {authVariable.lowerLink}
            </LinkTo>
          </p>
        )}
      </Form>
      {actionData && actionData.error && (
        <ErrorModal
          onClose={closeModal}
          isOpen={errorModal}
          errorText={actionData.message}
          errorHeader={actionData.header}
        />
      )}
    </Fragment>
  );
};

export default AuthForm;
