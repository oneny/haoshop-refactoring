import { ReactNode } from 'react'
import * as S from './style';

type InfoBoxProps = {
  title: string;
  children: ReactNode;
}

export const InfoBox = ({ title, children }: InfoBoxProps) => {
  return (
    <S.InfoContainer>
      <S.InfoBoxTtle>{title}</S.InfoBoxTtle>

      {children}
    </S.InfoContainer>
  )
}
