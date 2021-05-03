import React, { Fragment } from 'react';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price:
      {' '}
      <strong>
        $
        {props.price.toFixed(2)}
      </strong>
    </p>
    {props.ingredients.map((el) => (
      <Fragment key={el.name}>
        <BuildControl
          label={el.name}
          added={() => props.ingredientAdded(el)}
          removed={() => props.ingredientRemoved(el)}
          disabled={el.amount < 1}
        />
      </Fragment>
    ))}
    <div className={classes.OrderButtons}>
      {props.isAuth ? (
        <>
          {' '}
          <button
            type="button"
            className={classes.OrderButton}
            disabled={
              props.ingredients.filter((el) => el.amount > 0).length <= 0
            }
            onClick={props.checkout}
          >
            ORDER NOW
          </button>
          <button
            type="button"
            className={classes.ClearButton}
            disabled={
              props.ingredients.filter((el) => el.amount > 0).length <= 0
            }
            onClick={props.clearBurger}
          >
            CLEAR BURGER
          </button>
        </>
      ) : (
        <button type="button" className={classes.OrderButton} onClick={props.signup}>
          SIGN UP NOW TO ORDER
        </button>
      )}
    </div>
  </div>
);

export default BuildControls;
