import styled from "styled-components";

export const ErrorContainer = styled.div`
  backgorund-color: royalblue;
  height: calc(100vh - 360px);
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

export const ResetButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 2rem;
  color: ${({ theme }) => theme.palette.white};
  background-color: ${({ theme }) => theme.palette.background};
`;