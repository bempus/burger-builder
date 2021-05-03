import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  const inputClasses = props.invalid && props.touched
    ? [classes.InputElement, classes.Invalid]
    : [classes.InputElement];

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.options.map((el) => (
            <option key={el.value} value={el.value}>
              {el.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <span className={classes.Label}>{props.label}</span>
      {inputElement}
      <div className={classes.Error}>
        {' '}
        {props.invalid && props.touched && props.validation.error}
      </div>
    </div>
  );
};

export default input;
