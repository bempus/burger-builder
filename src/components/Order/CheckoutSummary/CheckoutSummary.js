import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>
      We hope it tastes
      {' '}
      <b>GREAT</b>
    </h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" clicked={props.onCheckoutCancelled}>
      CANCEL
    </Button>
    <Button btnType="Success" clicked={props.onCheckoutContinued}>
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
