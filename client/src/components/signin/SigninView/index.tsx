import { TSigninProps } from 'types/auth';
import { Footer, SigninInput } from 'components';
import * as S from './style';

export const SigninView = ({
  errMsg,
  onChangeEmail,
  onChangePassword,
  emailRef,
  errRef,
  handleSubmit,
}: TSigninProps) => {
  return (
    <>
      <S.Conatiner>
        <S.LoginContainer>
          <S.LoginTitle>SIGN IN</S.LoginTitle>
          {errMsg && <p ref={errRef}>{errMsg}</p>}
          <S.LoginForm onSubmit={handleSubmit}>
            <SigninInput
              ref={emailRef}
              id='email'
              lableText='Email'
              type='email'
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
      </S.Conatiner>
      <Footer />
    </>
  );
};
