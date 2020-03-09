import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useNavigation } from '@react-navigation/native';

import Background from '~/components/Background';
import api from '~/services/api';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ route }) {
  const navigation = useNavigation();
  const { provider, time } = route.params;
  const DateFormated = useMemo(() => {
    formatRelative(parseISO(time), new Date(), { locale: pt });
  }, [time]);
  async function handleAppointment() {
    await api.post('appointment', {
      provider_id: provider.id,
      date: time,
    });
    navigation.navigate('Dashboard');
  }
  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{DateFormated}</Time>
        <SubmitButton onPress={handleAppointment}>
          Confirm appointment
        </SubmitButton>
      </Container>
    </Background>
  );
}
