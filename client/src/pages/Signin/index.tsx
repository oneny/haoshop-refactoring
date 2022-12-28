import { SigninForm } from 'components';
import useTitle from 'hooks/useTitle';

export const Signin = () => {
  useTitle('HOW ABOUT OOTD | SIGNIN');
  
  return <SigninForm />
}
