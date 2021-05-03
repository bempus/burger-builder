export const checkValidation = (value, rules) => {
  if (rules.required) {
    if (
      value.trim() === ''
      || rules.minLength > value.length
      || rules.maxLength < value.length
    ) return false;
  }

  return true;
};

export default checkValidation;
