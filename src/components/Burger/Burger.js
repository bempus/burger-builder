import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
  const ingredients = props.ingredients.map((el, i) => (
    <BurgerIngredient key={i} type={el} />
  ));
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {props.ingredients.length === 0 ? (
        <p>Add an ingredient to start building the burger</p>
      ) : (
        ingredients
      )}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
