import { useAuth } from 'hooks';
import { useSignOutMutation } from 'store/apis/authApiSlice';
import * as S from './style';

export const Navbar = () => {
  const { id } = useAuth();
  const [signOut] = useSignOutMutation();

  const handleSignout = async () => {
    await signOut();
  };

  return (
    <S.NavContainer>
      <S.NavList>
        <S.NavItem>
          <S.LinkText to='/categories/all'>SHOPPING</S.LinkText>
        </S.NavItem>
        <S.NavItem>BRAND</S.NavItem>
        <S.NavItem>
          <S.LinkText to='/lookbooks'>LOOKBOOK</S.LinkText>
        </S.NavItem>
        <S.NavItem>
          <S.LinkText to='/collections'>COLLECTION</S.LinkText>
        </S.NavItem>
      </S.NavList>

      <S.NavList>
        <S.NavItem>SEARCH</S.NavItem>
        <S.NavItem>
          <S.LinkText to='/contact'>CONTACT</S.LinkText>
        </S.NavItem>
        <S.NavItem>
          <S.LinkText to='/cart'>CART</S.LinkText>
        </S.NavItem>
        <S.NavItem>
          {id ? (
            <button onClick={handleSignout}>SIGNOUT</button>
          ) : (
            <S.LinkText to='/signin'>SIGNIN</S.LinkText>
          )}
        </S.NavItem>
        <S.NavItem>
          <S.LinkText to='/signup'>SIGNUP</S.LinkText>
        </S.NavItem>
      </S.NavList>
    </S.NavContainer>
  );
};
