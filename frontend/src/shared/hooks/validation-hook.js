import { useReducer } from 'react';
import { validate } from '../util/validation/validators';
import { actionTypes } from '../constants';

const validationReducer = (state, { type, value, validators }) => {
  switch (type) {
    case actionTypes.ON_CHANGE:
      return {
        ...state,
        value,
        isValid: validate(value, validators),
      };
    case actionTypes.ON_BLUR: {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const useValidation = (val, valid) => {
  const [inputState, dispatch] = useReducer(validationReducer, {
    value: val,
    isTouched: false,
    isValid: valid || false,
  });

  return { inputState, dispatch };
};

export default useValidation;
