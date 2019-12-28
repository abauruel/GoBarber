import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';

import { signInRequest } from '~/store/modules/auth/action';
// import { Container } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail valido')
      .required('e-mail e obrigatorio'),
    password: Yup.string().required('senha é obrigatorio'),
  });

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="Gobarber" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input name="email" type="email" placeholder="seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">{loading ? ' Carregando...' : 'Acessar'}</button>
        <Link to="/register">Cadastrar</Link>
      </Form>
    </>
  );
}
