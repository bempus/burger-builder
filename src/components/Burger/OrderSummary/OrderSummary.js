import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const getIngredients = props.ingredients
    .filter((el) => el.amount > 0)
    .map((el) => (
      <li key={el.name}>
        <span style={{ textTransform: 'capitalize' }}>
          {el.name.replace('_', ' ')}
          :
        </span>
        {' '}
        {el.amount}
      </li>
    ));
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicions burger with the following ingredients:</p>
      <ul>{getIngredients}</ul>
      <p>
        <strong>
          Total price: $
          {props.price.toFixed(2)}
        </strong>
      </p>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default orderSummary;
