import * as actionTypes from './actionTypes';

export const addIngredient = (ingredientName) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName,
});
export const removeIngredient = (ingredientName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName,
});

export const setIngredients = (controls) => ({
  type: actionTypes.SET_CONTROLS,
  controls,
});

export const emptyIngredients = () => ({
  type: actionTypes.EMPTY_INGREDIENTS,
});

export const listIngredients = () => ({
  type: actionTypes.LIST_INGREDIENTS,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_CONTROLS_FAILED,
});

export const initIngredients = () => ({
  type: actionTypes.FETCH_CONTROLS_INIT,
});
