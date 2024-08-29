import React from 'react';
import { render } from '@testing-library/react-native';
import Actividad from '../../components/actividad';
import { ThemeProvider } from '../../controllers/controladorContexto';

test('renderiza el componente con las propiedades proporcionadas', () => {
  const props = {
    imagen: 'https://example.com/image.png',
    titulo: 'Correr',
    hora: '07:00 AM',
    tipo: 'Ejercicio',
  };

  const { getByText, getByAltText } = render(
    <ThemeProvider>
      <Actividad {...props} />
    </ThemeProvider>
  );

  expect(getByText('Correr')).toBeTruthy();
  expect(getByText('07:00 AM')).toBeTruthy();
  expect(getByText('Ejercicio')).toBeTruthy();
});
