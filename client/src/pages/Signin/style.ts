import styled from 'styled-components';

export const Conatiner = styled.main`
  height: calc(100vh - 360px);
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.bp.md}) {
    height: 100svh;
  }
`