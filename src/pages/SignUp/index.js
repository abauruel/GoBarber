import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';

import { singUpRequest } from '~/store/modules/auth/action';
// import { Container } from './styles';

export default function SignUp() {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatorio'),
    email: Yup.string()
      .email('Insira um e-mail valido')
      .required('e-mail e obrigatorio'),
    password: Yup.string()
      .min(6, 'No minimo 6 caracteres')
      .required('senha é obrigatorio'),
  });
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    console.tron.log(name, email, password);
    dispatch(singUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="Gobarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Seu Nome Completo" />
        <Input name="email" type="email" placeholder="seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">Cadastrar</button>
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
}
