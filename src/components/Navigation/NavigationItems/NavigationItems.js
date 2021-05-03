import React, { Fragment } from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem clicked={props.clicked} link="/">
      Burger Builder
    </NavigationItem>
    {props.isAuth ? (
      <>
        <NavigationItem clicked={props.clicked} link="/orders">
          Orders
        </NavigationItem>
        <NavigationItem clicked={props.clicked} link="/logout">
          Logout
        </NavigationItem>
      </>
    ) : (
      <NavigationItem clicked={props.clicked} link="/auth">
        Login
      </NavigationItem>
    )}
  </ul>
);

export default navigationItems;
