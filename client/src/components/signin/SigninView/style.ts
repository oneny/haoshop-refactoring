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

export const LoginContainer = styled.section`
  width: min(35rem, calc(100% - 3rem));
  display: flex;
  flex-direction: column;
  row-gap: 2rem; 
  align-items: center;
  margin: 0 auto;
`

export const LoginTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
`

export const LoginForm = styled.form`
  width: 100%;
`;

export const LoginBtn = styled.button`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem 0;
  font-size: ${({ theme }) => theme.fontSize.lgFont};
  color: ${({ theme }) => theme.palette.white};
  background-color: ${({ theme }) => theme.palette.background};
`