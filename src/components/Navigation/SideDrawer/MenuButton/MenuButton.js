import React from 'react';

import BurgerIconBlack from '../../../../assets/svg/burger-black.svg';
import BurgerIconWhite from '../../../../assets/svg/burger-white.svg';

import classes from './MenuButton.module.css';

const menuButton = (props) => (
  <img
    src={props.invertColor ? BurgerIconWhite : BurgerIconBlack}
    alt="BurgerIcon"
    onClick={props.clicked}
    className={[classes.MenuButton, props.classes].join(' ')}
  />
);
export default menuButton;
