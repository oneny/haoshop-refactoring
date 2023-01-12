import styled from "styled-components";

export const LookbookSection = styled.section`
  padding: 7rem 12rem;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    padding: 7rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.bp.md}) {
    padding: 2rem;
  }
`

export const LookbooksList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${({ theme }) => theme.bp.sm}) {
    grid-template-columns: 1fr;
  }
`

export const LookbookName = styled.strong`
  display: block;
  margin-top: .5rem;
  font-size: 1.5rem;
  font-weight: 600;

  @media screen and (max-width: ${({ theme }) => theme.bp.md}){
    font-size: 1.3rem;
  }
`

export const ImgBox = styled.div`
  padding-top: 150%;
`