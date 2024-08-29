// __tests__/RutinaComponent.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RutinaComponent from '../../components/rutinas';
import { useTheme } from '../../controllers/controladorContexto';

// Mock del hook useTheme
jest.mock('../../controllers/controladorContexto', () => ({
  useTheme: jest.fn(),
}));

describe('RutinaComponent', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar con el estilo correcto en modo claro', () => {
    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByText, getByTestId } = render(
      <RutinaComponent
        titulo="Rutina Matutina"
        hora="08:00"
        imagen="https://example.com/image.jpg"
        onPress={mockOnPress}
      />
    );

    // Verifica el estilo del contenedor en modo claro
    const rutinaContainer = getByTestId('rutina-container');
    expect(rutinaContainer.props.style).toEqual(expect.objectContaining({
      backgroundColor: '#f0f0f0',
    }));

    // Verifica el estilo del título en modo claro
    const tituloText = getByText('Rutina Matutina');
    expect(tituloText.props.style).toEqual(expect.objectContaining({
      color: '#333',
    }));

    // Verifica la imagen
    const image = getByTestId('rutina-image');
    expect(image.props.source.uri).toBe('https://example.com/image.jpg');
  });

  it('debería renderizar con el estilo correcto en modo oscuro', () => {
    useTheme.mockReturnValue({
      isDarkMode: true,
    });

    const { getByText, getByTestId } = render(
      <RutinaComponent
        titulo="Rutina Nocturna"
        hora="20:00"
        imagen="https://example.com/image-dark.jpg"
        onPress={mockOnPress}
      />
    );

    // Verifica el estilo del contenedor en modo oscuro
    const rutinaContainer = getByTestId('rutina-container');
    expect(rutinaContainer.props.style).toEqual(expect.objectContaining({
      backgroundColor: '#1E1E1E',
    }));

    // Verifica el estilo del título en modo oscuro
    const tituloText = getByText('Rutina Nocturna');
    expect(tituloText.props.style).toEqual(expect.objectContaining({
      color: '#FFFFFF',
    }));

    // Verifica la imagen
    const image = getByTestId('rutina-image');
    expect(image.props.source.uri).toBe('https://example.com/image-dark.jpg');
  });

  it('debería llamar onPress cuando se presiona el componente', () => {
    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByTestId } = render(
      <RutinaComponent
        titulo="Rutina de Prueba"
        hora="12:00"
        imagen="https://example.com/image-test.jpg"
        onPress={mockOnPress}
      />
    );

    // Simula la presión del botón
    fireEvent.press(getByTestId('rutina-container'));

    // Verifica que la función onPress haya sido llamada
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
