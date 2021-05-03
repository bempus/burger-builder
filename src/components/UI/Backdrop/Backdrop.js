import React from 'react';

import classes from './BackDrop.module.css';

const backDrop = (props) => (props.show ? (
  <div aria-hidden="true" className={classes.Backdrop} onClick={props.clicked} />
) : null);

export default backDrop;
