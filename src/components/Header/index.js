import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo7159c1.svg';
import Notifications from '../Notifications';
import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gobarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>Alex Claude</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Alex Claude"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
