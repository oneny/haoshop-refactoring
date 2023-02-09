import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  position: relative;
  padding: 1.6rem 2rem;
  background-color: ${({ theme }) => theme.palette.white};

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const HeaderTitleLink = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
`;

export const HeaderTitle = styled.h1`
  font-weight: 700;
  font-size: 2.8rem;
  white-space: nowrap;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    font-size: 2.2rem;
  }
`;

export const MenuButton = styled.button`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    display: block;
  }
`;

export const SearchButton = styled.button`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    display: block;
  }
`;
