import { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import * as S from './style';

export const QueryErrorResetBoundary = ({ children }: { children: ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <S.ErrorContainer>
          <p>There was an error!</p>
          <S.ResetButton onClick={() => resetErrorBoundary()}>Try again</S.ResetButton>
        </S.ErrorContainer>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
