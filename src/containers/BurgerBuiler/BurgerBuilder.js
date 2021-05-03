import React, {
  Fragment, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import {
  addIngredient,
  purchaseInit,
  removeIngredient,
  emptyIngredients,
  initIngredients,
  setAuthRedirectPath,
} from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

// SET STATE
const BurgerBuilder = (props) => {
  const [checkout, setCheckout] = useState(false);

  // SET SELECTORS
  const { ingredients, ingredientsList, totalPrice } = useSelector(
    (state) => state.burgerBuilder,
  );
  const { purchased } = useSelector((state) => state.order);
  const isLoggedIn = useSelector((state) => state.auth.token !== null);

  // SET DISPATCH
  const dispatch = useDispatch();
  const onIngredientsAdded = (ingredientName) => dispatch(addIngredient(ingredientName));
  const onIngredientsRemoved = (ingredientName) => dispatch(removeIngredient(ingredientName));
  const onEmptyIngredients = useCallback(() => dispatch(emptyIngredients()), [
    dispatch,
  ]);
  const onSetAuthRedirectPath = useCallback((path) => dispatch(setAuthRedirectPath(path)), [
    dispatch,
  ]);

  // SET EFFECT
  useEffect(() => {
    onSetAuthRedirectPath('/');
    if (Object.keys(ingredients).length === 0) dispatch(initIngredients());
    if (purchased) {
      onEmptyIngredients();
      dispatch(purchaseInit());
    }
  }, [
    dispatch,
    onEmptyIngredients,
    onSetAuthRedirectPath,
    ingredients,
    purchased,
  ]);

  const checkoutHandler = () => {
    setCheckout(!checkout);
  };

  const checkoutContinueHandler = async () => {
    props.history.push('/checkout');
  };

  const redirectToLogin = () => {
    onSetAuthRedirectPath('/checkout');
    props.history.push('/auth');
  };

  const orderSummary = (
    <OrderSummary
      ingredients={ingredients}
      checkoutContinued={checkoutContinueHandler}
      checkoutCancelled={checkoutHandler}
      price={totalPrice}
    />
  );
  const buildControls = (
    <BuildControls
      isAuth={isLoggedIn}
      ingredientAdded={onIngredientsAdded}
      ingredientRemoved={onIngredientsRemoved}
      ingredients={ingredients}
      signup={redirectToLogin}
      checkout={checkoutHandler}
      price={totalPrice}
      clearBurger={onEmptyIngredients}
    />
  );

  return (
    <>
      <Modal
        show={checkout}
        loading={props.loading}
        modalClose={checkoutHandler}
      >
        {orderSummary}
      </Modal>
      <Burger ingredients={ingredientsList} />
      {Object.keys(ingredients).length === 0 ? <Spinner /> : buildControls}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
