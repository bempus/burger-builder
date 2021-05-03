import React from 'react';

import BurgerLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.module.css';

const logo = () => (
  <div className={classes.Logo}>
    <img src={BurgerLogo} alt="BurgerDing" />
  </div>
);

export default logo;
