import { useAuth } from 'hooks';
import { useSignoutMutation } from 'queries/auth';
import * as S from './style';

export const Navbar = () => {
  const { id } = useAuth();
  const { mutate: signout } = useSignoutMutation();

  const handleSignout = () => signout();

  return (
    <S.NavContainer>
      <S.NavList>
        <S.NavItem>
          <S.LinkText href='/categories/all'>SHOPPING</S.LinkText>
        </S.NavItem>
        <S.NavItem>BRAND</S.NavItem>
        <S.NavItem>
          <S.LinkText href='/lookbooks'>LOOKBOOK</S.LinkText>
        </S.NavItem>
        <S.NavItem>
          <S.LinkText href='/collections'>COLLECTION</S.LinkText>
        </S.NavItem>
      </S.NavList>

      <S.NavList>
        <S.NavItem>SEARCH</S.NavItem>
        <S.NavItem>
          <S.LinkText href='/contact'>CONTACT</S.LinkText>
        </S.NavItem>
        <S.NavItem>
          <S.LinkText href='/cart'>CART</S.LinkText>
        </S.NavItem>
        <S.NavItem>
          {id ? (
            <button onClick={handleSignout}>SIGNOUT</button>
          ) : (
            <S.LinkText href='/signin'>SIGNIN</S.LinkText>
          )}
        </S.NavItem>
        <S.NavItem>
          <S.LinkText href='/signup'>SIGNUP</S.LinkText>
        </S.NavItem>
      </S.NavList>
    </S.NavContainer>
  );
};
