import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const res = yield axios.post(
      `/orders.json?auth=${action.token}`,
      action.orderData,
    );
    localStorage.removeItem('ingredients');
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  } catch (e) {
    yield put(actions.purchaseBurgerFail(e));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const orders = [];
  try {
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    const res = yield axios.get(`/orders.json${queryParams}`);
    for (const key in res.data) {
      orders.push({ ...res.data[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(orders));
  } catch (e) {
    yield put(actions.fetchOrdersFail(e));
  }
}
