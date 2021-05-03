import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export default function* initIngredientsSaga(action) {
  try {
    const res = yield axios.get('/ingredients.json');
    const controls = yield Object.entries(res.data).map(([key, value]) => ({
      key,
      name: key,
      amount: value.amount,
      price: value.price,
    }));
    yield put(actions.setIngredients(controls));
    yield put(actions.listIngredients());
  } catch (e) {
    yield put(actions.fetchIngredientsFailed());
  }
}
