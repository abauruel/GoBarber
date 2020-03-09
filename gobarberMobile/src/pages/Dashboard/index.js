import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import api from '~/services/api';
import { Container, Title, List } from './styles';

export default function Dashboard() {
  const [appointments, setAppointment] = useState();
  const isFocused = useIsFocused();

  async function loadAppointment() {
    const response = await api.get('appointment');
    setAppointment(response.data);
  }
  useEffect(() => {
    if (isFocused) {
      loadAppointment();
    }
  }, [isFocused, appointments]);

  async function handleCancel(id) {
    const response = await api.delete(`appointment/${id}`);
    setAppointment(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Appointments</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}
