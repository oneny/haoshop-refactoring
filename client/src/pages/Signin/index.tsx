import { SigninForm } from 'components';
import useTitle from 'hooks/useTitle';
import * as S from './style';

export const Signin = () => {
  useTitle('HOW ABOUT OOTD | SIGNIN');

  return (
    <S.Conatiner>
      <SigninForm />
    </S.Conatiner>
  );
};
