import React from 'react';
import classes from './Spinner.module.css';

const spinner = () => (
  <div className={classes.Spinner}>
    <div className={classes.Loader}>
      <div />
    </div>
    <h1>Loading...</h1>
  </div>
);
export default spinner;
