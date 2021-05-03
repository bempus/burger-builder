import * as actionTypes from '../actions/actionTypes';

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

const stateCreator3000 = (state, i = 0) => {
  const status = { loading: false, purchased: false };
  switch (i) {
    case 1:
      status.loading = true;
      break;
    case 2:
      status.purchased = true;
      break;
    default:
      break;
  }
  return { ...state, ...status };
};

const fetchOrdersSuccess = (state, action) => ({
  ...stateCreator3000(state),
  orders: action.orders,
});

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return stateCreator3000(state, 1);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return stateCreator3000(state, 2);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return stateCreator3000(state);
    case actionTypes.PURCHASE_INIT:
      return stateCreator3000(state);
    case actionTypes.FETCH_ORDERS_START:
      return stateCreator3000(state, 1);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return stateCreator3000(state);
    default:
      return stateCreator3000(state, 0);
  }
};

export default reducer;
