import { Navbar } from '../Navbar';
import { SVGIcon } from '../SVGIcon';
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
        <SVGIcon id='icon-menu' size={24} />
      </S.MenuButton>
      <S.SearchButton>
        <span className='ir'>검색 버튼</span>
        <SVGIcon id='icon-search' size={24} />
      </S.SearchButton>
    </S.HeaderContainer>
  );
};
