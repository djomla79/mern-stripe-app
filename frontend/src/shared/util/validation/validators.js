import { validationTypes } from '../../constants/index';

export const VALIDATOR_REQUIRE = () => ({
  type: validationTypes.VALIDATOR_TYPE_REQUIRE,
});
export const VALIDATOR_FILE = () => ({
  type: validationTypes.VALIDATOR_TYPE_FILE,
});
export const VALIDATOR_MINLENGTH = (val) => ({
  type: validationTypes.VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: validationTypes.VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({
  type: validationTypes.VALIDATOR_TYPE_MIN,
  val: val,
});
export const VALIDATOR_MAX = (val) => ({
  type: validationTypes.VALIDATOR_TYPE_MAX,
  val: val,
});
export const VALIDATOR_EMAIL = () => ({
  type: validationTypes.VALIDATOR_TYPE_EMAIL,
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === validationTypes.VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === validationTypes.VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === validationTypes.VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === validationTypes.VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === validationTypes.VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === validationTypes.VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
