import { put, delay } from 'redux-saga/effects';
import Axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  const url = action.isSignup
    ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKvvR40GtZQenaoFyJ6uu_QTjpTWOwNow'
    : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKvvR40GtZQenaoFyJ6uu_QTjpTWOwNow';
  try {
    const res = yield Axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000,
    );
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', res.data.localId);

    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (e) {
    yield put(actions.authFail(e.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
  if (token && expirationDate > new Date()) {
    const userId = yield localStorage.getItem('userId');
    yield put(actions.authSuccess(token, userId));
    yield put(
      actions.checkAuthTimeout((expirationDate.getTime() - Date.now()) / 1000),
    );
  } else {
    yield put(actions.logout());
  }
}
