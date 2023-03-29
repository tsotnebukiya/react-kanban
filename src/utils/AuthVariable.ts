export class AuthVariable {
  forgot: boolean;
  header: string;
  buttonText: string;
  upperLink: string;
  upperLinkPath: string;
  lowerLink?: string;
  lowerLinkPath: string;
  lowerText?: string;
  constructor(mode: 'login' | 'signup' | 'forgot') {
    if (mode === 'login') {
      this.forgot = false;
      this.header = 'Log in to your account';
      this.buttonText = 'Login';
      this.upperLink = 'Forgot Password?';
      this.upperLinkPath = '?mode=forgot';
      this.lowerLink = 'Sign Up';
      this.lowerLinkPath = '?mode=signup';
      this.lowerText = `Don't have an account yet? `;
    } else if (mode === 'signup') {
      this.forgot = false;
      this.header = 'Create new account';
      this.buttonText = 'Signup';
      this.upperLink = 'Forgot Password?';
      this.upperLinkPath = '?mode=forgot';
      this.lowerLink = 'Login';
      this.lowerLinkPath = '?mode=login';
      this.lowerText = 'Already have an account? ';
    } else {
      this.forgot = true;
      this.header = 'Recover your password';
      this.buttonText = 'Recover';
      this.upperLink = 'Back';
      this.upperLinkPath = '?mode=login';
      this.lowerLinkPath = '';
    }
  }
}
