import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';
import * as S from './style';

export const Header = () => {
  return (
    <S.HeaderContainer>
      <Link to='/'>
        <S.HeaderTitle>HOW ABOUT OOTD</S.HeaderTitle>
      </Link>

      <Navbar />
    </S.HeaderContainer>
  );
};
