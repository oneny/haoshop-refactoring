import { useCallback, useState, ChangeEvent } from 'react';

function useInput(initValue: string) {
  const [value, setValue] = useState(initValue);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  }, []);

  return [value, onChange, setValue];
}

export default useInput;
