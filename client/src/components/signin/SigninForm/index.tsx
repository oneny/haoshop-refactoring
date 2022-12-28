import { SigninInput } from 'components';
import { useAppDispatch } from 'hooks/useAppStore';
import {useInput, useTitle } from 'hooks';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSigninMutation } from 'store/apis/authApiSlice';
import { setCredentials } from 'store/slices/authSlice';
import * as S from './style';

interface SigninError extends Error {
  data?: any;
}

export const SigninForm = () => {
  useTitle('HOW ABOUT OOTD - SIGNIN');
  const dispatch = useAppDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [errMsg, setErrMsg] = useState<string>('');
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [signin] = useSigninMutation();

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await signin({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }))
    } catch (err: unknown) {
      setErrMsg((err as SigninError).data.error);
    }
  };


  return (
    <S.LoginContainer>
      <S.LoginTitle>SIGN IN</S.LoginTitle>
      {errMsg && <p ref={errRef}>{errMsg}</p>}
      <S.LoginForm onSubmit={handleSubmit}>
        <SigninInput
          ref={emailRef}
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
