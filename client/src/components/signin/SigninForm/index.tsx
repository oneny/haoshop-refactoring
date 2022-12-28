import { useEffect, useRef } from 'react';
import useInput from 'hooks/useInput';
import { SigninInput } from 'components';

export const SigninForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  return (
    <section>
      <h3>로그인</h3>
      <form>
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
      </form>
    </section>
  );
};
