import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/CheckoutSummary/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

const Orders = (props) => {
  const { onFetchOrders, token, userId } = props;

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  return props.loading ? (
    <Spinner />
  ) : (
    <div>
      {props.orders.map((order) => (
        <Order
          ingredients={order.ingredients}
          price={+order.price}
          key={order.id}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token, userId) => {
    dispatch(actions.fetchOrders(token, userId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
