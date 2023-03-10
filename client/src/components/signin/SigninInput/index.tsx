import { ChangeEvent, forwardRef } from 'react';
import * as S from './style';

type SigninInputProps = {
  id: string;
  type: string;
  lableText: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SigninInput = forwardRef<HTMLInputElement, SigninInputProps>((props, ref) => {
  return (
    <S.InputContainer>
      <S.SigninInput ref={ref} {...props} />
      <label htmlFor={props.id}>{props.lableText}</label>
    </S.InputContainer>
  );
});
