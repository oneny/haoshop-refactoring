import { AxiosError } from 'axios';
import { SigninView } from 'components';
import { useInput, useTitle } from 'hooks';
import { useSigninMutation } from 'queries/auth';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { TSigninProps } from 'types/auth';

export default function Sigin () {
  useTitle('SIGNIN - HOW ABOUT OOTD');

  const { push } = useRouter();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [errMsg, setErrMsg] = useState<string | undefined>();
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const { mutateAsync: signinMutate, isSuccess } = useSigninMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signinMutate({ email, password });
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
      push('/');
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
