import React from 'react';
import Input from '../../components/UI/Input/Input';

export const formBuilder = (
  req = [true, 'Missing information'],
  validationOptions = {},
  placeholder = '',
  type = 'text',
  value = '',
  elementType = 'input',
  options = [],
) => {
  const [required, error] = [...req];
  return {
    elementType,
    elementConfig: {
      type,
      placeholder,
    },
    value,
    options,
    validation: {
      required,
      error,
      valid: !required,
      ...validationOptions,
    },
    touched: false,
  };
};

export const renderForm = (form, changedHandler) => Object.entries(form).map((input) => {
  const [key, value] = input;

  return (
    <Input
      key={key}
      elementType={value.elementType}
      elementConfig={value.elementConfig}
      invalid={!value.validation.valid}
      touched={value.touched}
      validation={value.validation}
      value={value.value}
      options={value.options}
      changed={(event) => changedHandler(event, key)}
    />
  );
});
