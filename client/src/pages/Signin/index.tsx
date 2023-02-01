import { TSigninProps } from 'types/auth';
import { SigninView } from 'components';
import { useInput, useTitle } from 'hooks';
import { useAppDispatch } from 'hooks/useAppStore';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSigninMutation } from 'store/apis/authApiSlice';
import { setCredentials } from 'store/slices/authSlice';
import { setPersisted } from 'utils/persistLogin';

interface SigninError extends Error {
  data?: any;
}

export const Signin = () => {
  useTitle('SIGNIN - HOW ABOUT OOTD');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [errMsg, setErrMsg] = useState('');
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
      dispatch(setCredentials({ accessToken }));
      setEmail('');
      setPassword('');
      navigate('/');
      setPersisted(true);
    } catch (err: unknown) {
      setErrMsg((err as SigninError).data.error);
    }
  };

  const SigninProps: TSigninProps = {
    errMsg,
    onChangeEmail,
    onChangePassword,
    emailRef,
    errRef,
    handleSubmit,
  };

  return <SigninView {...SigninProps} />
};
