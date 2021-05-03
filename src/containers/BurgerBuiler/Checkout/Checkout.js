import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.replace('/');
  };
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;
  if (props.ingredientsList.length) {
    const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchaseRedirect}
        <Route
          path={props.match.path}
          render={() => (
            <CheckoutSummary
              ingredients={props.ingredientsList}
              onCheckoutCancelled={checkoutCancelledHandler}
              onCheckoutContinued={checkoutContinuedHandler}
            />
          )}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => ({
  ingredientsList: state.burgerBuilder.ingredientsList,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
