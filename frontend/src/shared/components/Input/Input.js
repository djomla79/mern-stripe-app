import { useEffect } from 'react';
import useValidation from '../../hooks/validation-hook';
import { actionTypes } from '../../constants';

import './Input.css';

const Input = ({
  id,
  element: el,
  label,
  type,
  value: val,
  valid,
  rows,
  className,
  onInput,
  validators,
  errorText,
  ...next
}) => {
  const { inputState, dispatch } = useValidation(val, valid);
  const { value, isValid, isTouched } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const onChangeHandler = (event) => {
    dispatch({
      type: actionTypes.ON_CHANGE,
      value: event.target.value,
      validators,
    });
  };

  const onBlurHandler = () => {
    dispatch({
      type: actionTypes.ON_BLUR,
    });
  };

  const element =
    el === 'input' ? (
      <input
        id={id}
        type={type}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={value}
        {...next}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={value}
        {...next}
      />
    );
  return (
    <div
      className={`form-control ${
        !isValid && isTouched && 'form-control--invalid'
      } ${className}`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!isValid && isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
