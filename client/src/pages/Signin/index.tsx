import { TSigninProps } from 'types/auth';
import { SigninView } from 'components';
import { useInput, useTitle } from 'hooks';
import { useAppDispatch } from 'hooks/useAppStore';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSigninMutation } from 'queries/auth';
import { setCredentials } from 'store/slices/authSlice';
import { setPersisted } from 'utils/persistLogin';
import { AxiosError } from 'axios';

export const Signin = () => {
  useTitle('SIGNIN - HOW ABOUT OOTD');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [errMsg, setErrMsg] = useState<string | undefined>();
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const { mutateAsync: signinMutate, isSuccess } = useSigninMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await signinMutate({ email, password });
      dispatch(setCredentials({ accessToken }));
    } catch (err: unknown) {
      setErrMsg((err as AxiosError<{ error: string }>)?.response?.data.error);
    }
  };

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setEmail('');
      setPassword('');
      navigate('/');
      setPersisted(true);
    }
  }, [isSuccess]);

  const SigninProps: TSigninProps = {
    errMsg,
    onChangeEmail,
    onChangePassword,
    emailRef,
    errRef,
    handleSubmit,
  };

  return <SigninView {...SigninProps} />;
};
