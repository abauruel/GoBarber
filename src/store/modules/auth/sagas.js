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
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (error) {
    yield put(signFailure());
    toast.error('Falha na autenticação, verifique seus dados');
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    console.tron.log(payload);
    yield call(api.post, 'user', {
      name,
      email,
      password,
      provider: true,
    });
    toast.success('cadastro realizado com sucesso!');
    history.push('/');
  } catch (err) {
    toast.error('falha no cadastro');
    yield put(signFailure());
  }
}
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function singOut() {
  history.push('/');
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGNUP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', singOut),
]);
