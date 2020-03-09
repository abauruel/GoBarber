/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '~/services/api';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ route }) {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  // eslint-disable-next-line react/prop-types
  const { provider } = route.params;

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
    }
    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', { provider, time });
  }
  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.availabe}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}
