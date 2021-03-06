import { takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from './auth';
import initIngredientsSaga from './burgerBuilder';
import { fetchOrdersSaga, purchaseBurgerSaga } from './order';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.FETCH_CONTROLS_INIT, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
}
