import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';
import * as S from './style';

export const Header = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderTitleLink to='/'>
        <S.HeaderTitle>HOW ABOUT OOTD</S.HeaderTitle>
      </S.HeaderTitleLink>

      <Navbar />
      <S.MenuButton>
        <span className='ir'>메뉴 열기 버튼</span>
      </S.MenuButton>
      <S.SearchButton>
        <span className='ir'>검색 버튼</span>
      </S.SearchButton>
    </S.HeaderContainer>
  );
};
