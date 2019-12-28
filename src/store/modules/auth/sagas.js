import { takeLatest, all, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './action';

export function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      yield put(signFailure());
      toast.error('Usuário não é prestador');
      return;
    }
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (error) {
    yield put(signFailure());
    toast.error('Falha na autenticação, verifique seus dados');
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
