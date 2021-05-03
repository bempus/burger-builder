import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from './ContactData.module.css';
import * as actions from '../../../../store/actions';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../../axios-orders';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { checkValidation, formBuilder, renderForm } from '../../../../Util';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: formBuilder([true, "Name can't be empty"], {}, 'Your Name'),
    street: formBuilder([true, "Street can't be empty"], {}, 'Street Name'),
    zipCode: formBuilder(
      [true, 'Zip Code must be 5 characters long'],
      { minLength: 5, maxLength: 5 },
      'Zip Code',
    ),
    country: formBuilder(
      [true, "Country/State can't be empty"],
      {},
      'Coutry/State Name',
    ),
    email: formBuilder(
      [true, "E-mail can't be empty"],
      {},
      'Your E-mail',
      'email',
    ),
    deliveryMethod: formBuilder(
      [false, 'Something went seriously wrong...'],
      {},
      'Delivery Method',
      '',
      'fastest',
      'select',
      [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'cheapest', displayValue: 'Cheapest' },
      ],
    ),
  });
  const [formIsValid, setformIsValid] = useState(false);

  const { onInitControls } = props;

  useEffect(() => {
    onInitControls();
  }, [onInitControls]);

  const orderHandler = async (event) => {
    event.preventDefault();
    const usedIngredients = {};
    props.ingredients
      .filter((el) => el.amount > 0)
      .map((el) => (usedIngredients[el.name] = el.amount));
    const orderData = {};
    Object.entries(orderForm).map(([key, value]) => (orderData[key] = value.value));
    const order = {
      ingredients: { ...usedIngredients },
      price: props.price,
      ingredientOrder: { ...props.ingredientsList },
      orderData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const newOrderForm = { ...orderForm };
    const updatedFormElement = { ...orderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.validation.valid = checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedFormElement.touched = true;
    newOrderForm[inputIdentifier] = updatedFormElement;

    let validForm = true;
    Object.entries(newOrderForm).map((input) => {
      const [, value] = input;
      return value.validation.valid ? null : (validForm = false);
    });
    setOrderForm(newOrderForm);
    setformIsValid(validForm);
  };

  const form = props.loading ? (
    <Spinner />
  ) : (
    renderForm(orderForm, inputChangedHandler)
  );
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact data</h4>
      <form onSubmit={orderHandler}>
        {form}
        <Button btnType="Danger" clicked={props.history.goBack}>
          Cancel
        </Button>
        <Button disabled={!formIsValid} btnType="Success">
          Order
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ingredientsList: state.burgerBuilder.ingredientsList,
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});
const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) => {
    dispatch(actions.purchaseBurger(orderData, token));
  },
  onInitControls: () => dispatch(actions.initIngredients()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactData, axios));
