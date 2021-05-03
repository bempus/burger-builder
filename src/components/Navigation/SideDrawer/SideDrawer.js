import React, { Fragment } from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  const attachedClasses = props.open
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];

  return (
    <>
      <BackDrop show={props.open} clicked={props.toggle} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems clicked={props.toggle} isAuth={props.isAuth} />
        </nav>
      </div>
    </>
  );
};
export default sideDrawer;
