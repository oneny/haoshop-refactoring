import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  padding: 5rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.lgFont};
  line-height: 1.8;
`;

export const ContactTitle = styled.span`
  font-weight: 600;
  font-size: 1.6rem;
`;

export const ContactAddr = styled.address`

`