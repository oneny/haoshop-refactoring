import jwtDecode from 'jwt-decode';
import { selectCurrentToken } from 'store/slices/authSlice';
import { useAppSelector } from './useAppStore';

type TokenProps = {
  id: string;
  roles: number[];
};

export const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  if (token) {
    const { id, roles } = jwtDecode<TokenProps>(token);

    return { id, roles };
  }

  return { id: '', roles: [] };
};
