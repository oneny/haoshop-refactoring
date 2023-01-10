import styled from "styled-components";

export const LookbookContainer = styled.main`
  display: flex;
  padding: 7rem 12rem;
  line-height: 1.4;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    padding: 7rem;
    flex-direction: column;
  }

  @media screen and (max-width: ${({ theme }) => theme.bp.md}) {
    padding: 2rem;
  }
`;

export const LookbookContent = styled.article`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-right: 2rem;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    padding-right: 0;
    padding-bottom: 2rem;
    gap: 1.5rem;
  }
`;

export const LookbookTitle = styled.h3`
  font-size: 2.1rem;
  font-weight: 700;

  @media screen and (max-width: ${({ theme }) => theme.bp.md}) {
    font-size: 1.7rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.bp.sm}) {
    font-size: 1.5rem;
  }
`;

export const LookbookImgList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`

export const LookbookInfo = styled.section`
  border-left: 1px solid ${({ theme }) => theme.palette.border};
  flex: 1 0 35rem;
  padding-left: 2rem;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    border-left: 0;
    border-top: 1px solid ${({ theme }) => theme.palette.border};
    padding-left: 0;
    padding-top: 2rem;
  }
`;

export const RelatedProductList = styled.ul`
  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

export const RelatedProductItem = styled.li`
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
  margin-bottom: 1rem;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    flex-direction: column;
    align-items: start;
  }
`;

export const ImgWrapper = styled.div`
  flex: 0 0 7rem;

  @media screen and (max-width: ${({ theme }) => theme.bp.lg}) {
    width: 100%;
    margin-bottom: .5rem;
  }
`;

export const RelatedProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RelatedProductBrand = styled.strong`
  font-weight: 600;
`;