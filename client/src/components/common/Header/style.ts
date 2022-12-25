import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  position: relative;
  background-color: #ddd;
  padding: 1.6rem 2rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.lg}) {
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    font-size: 2rem;
  }
`;

export const MenuButton = styled.button`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    display: block;
    width: 28px;
    height: 28px;
    background: url('/assets/icons/icon-menu.svg') no-repeat center / 28px 28px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}) {
    width: 24px;
    height: 24px;
    background: url('/assets/icons/icon-menu.svg') no-repeat center / 24px 24px;
  }
`;

export const SearchButton = styled.button`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    display: block;
    width: 28px;
    height: 28px;
    background: url('/assets/icons/icon-search.svg') no-repeat center / 28px
      28px;
    @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}) {
      width: 24px;
      height: 24px;
      background: url('/assets/icons/icon-search.svg') no-repeat center / 24px 24px;
    }
  }
`;
