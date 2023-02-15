import { Navbar } from '../Navbar';
import { MenuIcon, SearchIcon } from 'components';
import * as S from './style';

export const Header = () => {
  
  return (
    <S.HeaderContainer>
      <S.HeaderTitleLink href='/'>
        <S.HeaderTitle>HOW ABOUT OOTD</S.HeaderTitle>
      </S.HeaderTitleLink>

      <Navbar />
      <S.MenuButton>
        <span className='ir'>메뉴 열기 버튼</span>
        <MenuIcon />
      </S.MenuButton>
      <S.SearchButton>
        <span className='ir'>검색 버튼</span>
        <SearchIcon />
      </S.SearchButton>
    </S.HeaderContainer>
  );
};
