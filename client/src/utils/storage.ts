import { IS_PERSIST } from 'constants/persist';

export const getPersisted = (): boolean => {
  return !!localStorage.getItem(IS_PERSIST);
};

export const setPersisted = (value: boolean): void => {
  localStorage.setItem(IS_PERSIST, value.toString());
};

export const clearPersisted = (): void => {
  localStorage.removeItem(IS_PERSIST);
};
