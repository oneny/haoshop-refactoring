import { SigninInput } from 'components';
import useInput from 'hooks/useInput';
import { useEffect, useRef, MouseEventHandler, FormEvent } from 'react';
import { useSigninMutation } from 'store/apis/authApiSlice';
import * as S from './style';

export const SigninForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const ref = useRef<HTMLInputElement>(null);
  const [signin, { isLoading }] = useSigninMutation();

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> 
  ) => {
    e.preventDefault();
    try {
      const response = await signin({ email, password }).unwrap();
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <S.LoginContainer>
      <S.LoginTitle>SIGN IN</S.LoginTitle>

      <S.LoginForm onSubmit={handleSubmit}>
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
