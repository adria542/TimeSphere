import React from 'react';
import { render } from '@testing-library/react-native';
import Articulo from '../../components/articulo';

test('renderiza el componente con las propiedades proporcionadas', () => {
  const { getByTestId } = render(
    <Articulo
      imageSource={{ uri: 'https://example.com/image.png' }}
      nombreArticulo="Botella de Agua"
      checked={false}  // Asegúrate de pasar true o false aquí
      onToggle={() => {}}
    />
  );

  const checkboxElement = getByTestId('articulo-checkbox');

  // Ajusta la verificación según cómo el componente maneja `checked`
  expect(checkboxElement.props.style[0].borderColor).toBe('#657786');  // Estilo cuando está seleccionado
});
