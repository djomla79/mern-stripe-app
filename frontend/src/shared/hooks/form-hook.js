import { useCallback, useReducer } from 'react';
import { actionTypes } from '../constants';

const formReducer = (state, { type, inputId, isValid, value, inputs }) => {
  switch (type) {
    case actionTypes.INPUT_CHANGE:
      let formIsValid = true;
      for (const id in state.inputs) {
        if (!state.inputs[id]) {
          continue;
        }
        if (id === inputId) {
          formIsValid = formIsValid && isValid;
        } else {
          formIsValid = formIsValid && state.inputs[id].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputId]: { value, isValid },
        },
        isValid: formIsValid,
      };
    case actionTypes.UPDATE_FORM_DATA:
      return {
        inputs,
        isValid,
      };
    default:
      return state;
  }
};

const useForm = (initialInputs, initialValidState) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialValidState,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: actionTypes.INPUT_CHANGE,
      value,
      isValid,
      inputId: id,
    });
  }, []);

  const updateFormState = useCallback((inputs, isValid) => {
    dispatch({
      type: actionTypes.UPDATE_FORM_DATA,
      inputs,
      isValid,
    });
  }, []);

  return [formState, inputHandler, updateFormState];
};

export default useForm;
