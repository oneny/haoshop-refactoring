import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  padding: 0 .8rem 0 .8rem;
`

export const NavList = styled.ul`
  display: flex;
  column-gap: .6rem
`

export const NavItem = styled.li`
  padding: 0.6rem;
`

export const LinkText = styled(Link)`
  padding: 1.9rem 0;
`