import React, { useCallback, useState, ChangeEvent } from 'react';

type UseInputProps = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  React.Dispatch<React.SetStateAction<string>>,
];

export const useInput = (initValue: string): UseInputProps => {
  const [value, setValue] = useState(initValue);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  }, []);

  return [value, onChange, setValue];
};
