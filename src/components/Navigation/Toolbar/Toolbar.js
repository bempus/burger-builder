import React from 'react';
import Logo from '../../Logo/Logo';
import MenuButton from '../SideDrawer/MenuButton/MenuButton';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
    <MenuButton
      clicked={props.toggle}
      invertColor
      classes={[classes.MenuButton, classes.HideDesktop].join(' ')}
    />
  </header>
);

export default toolbar;
