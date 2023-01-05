import styled from 'styled-components';

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
`

export const SigninInput = styled.input`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border};
  background-color: transparent;
  padding: 25px 0 5px 0;
  font-size: ${({ theme }) => theme.fontSize.lgFont};

  &::placeholder {
    color: transparent;
  }

  & + label {
    position: absolute;
    top: 2.4rem;
    left: 0;
    color: #aaa;
    font-size: 1.4rem;
    transition: top 0.2s ease;
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    color: ${({ theme }) => theme.palette.maincolor};
    font-size: 1.3rem;
    position: 0;
    top: 0.2rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.bp.md}) {
    font-size: ${({ theme }) => theme.fontSize.mdFont};

    & + label {
      font-size: ${({ theme }) => theme.fontSize.mdFont};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.bp.sm}) {
    font-size: ${({ theme }) => theme.fontSize.smFont};

    & + label {
      font-size: ${({ theme }) => theme.fontSize.smFont};
    }
  }
`;
