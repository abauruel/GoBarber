import { takeLatest, all, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';

import { signInSuccess, signFailure } from './action';

export function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert('Erro no login', 'Usario nao pode ser prestador de servico');

      return;
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    // history.push('/dashboard');
  } catch (error) {
    yield put(signFailure());
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'user', {
      name,
      email,
      password,
    });
    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha ao gravar dados',
      'Falha ao gravar dados no servidor, por favor tente novamente mais tarde'
    );
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
  // history.push('/');
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGNUP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', singOut),
]);
