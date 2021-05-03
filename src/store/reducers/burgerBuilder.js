import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  base: 4,
};

const initialState = {
  ingredients: [],
  ingredientsList: localStorage.getItem('ingredients')
    ? localStorage.getItem('ingredients').split(',')
    : [],
  totalPrice: INGREDIENT_PRICES.base,
  error: false,
  building: false,
};

const setIngredientsList = (list) => {
  list.length > 0
    ? localStorage.setItem('ingredients', list)
    : localStorage.removeItem('ingredients');
};

const UpdateIngredients = (state = initialState) => {
  const thisState = { ...state };
  let totalPrice = INGREDIENT_PRICES.base;
  for (const ingredient of thisState.ingredientsList) {
    const ing = thisState.ingredients.filter(
      (el) => el.name === ingredient,
    )[0];
    ing.amount += 1;
    totalPrice += ing.price;
  }

  if (Number.isNaN(totalPrice)) {
    localStorage.removeItem('ingredients');
    thisState.ingredientsList = [];
    totalPrice = INGREDIENT_PRICES.base;
  } else setIngredientsList(thisState.ingredientsList);

  return {
    ...thisState,
    totalPrice,
  };
};

const setControls = (state, action) => ({
  ...state,
  ingredients: action.controls,
  error: false,
  building: false,
});

const setError = (state) => ({
  ...state,
  error: true,
});

const emptyIngredients = (state) => {
  const thisState = { ...state };
  localStorage.removeItem('ingredients');
  for (const ingredient of thisState.ingredients) {
    ingredient.amount = 0;
  }
  return {
    ...state,
    ingredientsList: [],
    totalPrice: INGREDIENT_PRICES.base,
  };
};

const addIngredient = (state, action) => {
  const thisState = { ...state };
  thisState.ingredientsList.unshift(action.ingredientName.name);
  thisState.totalPrice += action.ingredientName.price;
  thisState.ingredients.filter(
    (el) => el.name === action.ingredientName.name,
  )[0].amount += 1;
  setIngredientsList(thisState.ingredientsList);
  thisState.building = true;
  return thisState;
};

const removeIngredient = (state, action) => {
  const thisState = { ...state };
  const index = thisState.ingredientsList.indexOf(action.ingredientName.name);
  if (index > -1) {
    thisState.ingredientsList.splice(index, 1);
    thisState.totalPrice -= action.ingredientName.price;
    setIngredientsList(thisState.ingredientsList);
    thisState.ingredients.filter(
      (el) => el.name === action.ingredientName.name,
    )[0].amount -= 1;
  }
  thisState.building = true;
  return thisState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.LIST_INGREDIENTS:
      return UpdateIngredients(state);
    case actionTypes.SET_CONTROLS:
      return setControls(state, action);
    case actionTypes.FETCH_CONTROLS_FAILED:
      return setError(state);
    case actionTypes.EMPTY_INGREDIENTS:
      return emptyIngredients(state);
    default:
      return state;
  }
};

export default reducer;
