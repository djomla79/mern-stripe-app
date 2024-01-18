import { useState, useCallback } from 'react';

const useCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const onChangeHandler = useCallback((event) => {
    setIsChecked(event.target.checked);
  }, []);

  return { isChecked, onChangeHandler };
};

export default useCheckbox;
