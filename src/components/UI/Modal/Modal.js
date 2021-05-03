import React, { Fragment, memo } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const modal = (props) => (
  <>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
    <Backdrop show={props.show} clicked={props.modalClose} />
  </>
);

export default memo(
  modal,
  (prevProps, nextProps) => prevProps.show === nextProps.show
    && prevProps.children === nextProps.children,
);
