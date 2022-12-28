import { useEffect, useRef } from 'react';
import useInput from 'hooks/useInput';
import { SigninInput } from 'components';
import * as S from './style';

export const SigninForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  return (
    <S.LoginContainer>
      <S.LoginTitle>SIGN IN</S.LoginTitle>

      <S.LoginForm>
        <SigninInput
          ref={ref}
          id='email'
          lableText='Email'
          type='text'
          placeholder='Email'
          onChange={onChangeEmail}
        />
        <SigninInput
          id='password'
          lableText='Password'
          type='password'
          placeholder='Password'
          onChange={onChangePassword}
        />

        <S.LoginBtn>로그인</S.LoginBtn>
      </S.LoginForm>
    </S.LoginContainer>
  );
};
