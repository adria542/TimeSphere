// __tests__/Compra.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Compra from '../../components/compra';
import { useTheme } from '../../controllers/controladorContexto';

// Mock del hook useTheme
jest.mock('../../controllers/controladorContexto', () => ({
  useTheme: jest.fn(),
}));

describe('Compra', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar con el estilo correcto en modo claro', () => {
    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByText, getByTestId } = render(<Compra titulo="Compra" onPress={mockOnPress} />);

    // Verifica el texto del título
    const tituloText = getByText('Compra');
    expect(tituloText).toBeTruthy();

    // Verifica el estilo aplicado al contenedor en modo claro
    const container = getByTestId('compra-container');
    expect(container.props.style).toEqual(expect.objectContaining({
      backgroundColor: '#007BFF',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }));

    // Verifica el estilo aplicado al texto en modo claro
    expect(tituloText.props.style).toEqual(expect.objectContaining({
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    }));
  });

  it('debería renderizar con el estilo correcto en modo oscuro', () => {
    useTheme.mockReturnValue({
      isDarkMode: true,
    });

    const { getByText, getByTestId } = render(<Compra titulo="Compra" onPress={mockOnPress} />);

    // Verifica el texto del título
    const tituloText = getByText('Compra');
    expect(tituloText).toBeTruthy();

    // Verifica el estilo aplicado al contenedor en modo oscuro
    const container = getByTestId('compra-container');
    expect(container.props.style).toEqual(expect.objectContaining({
      backgroundColor: '#1E1E1E',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }));

    // Verifica el estilo aplicado al texto en modo oscuro
    expect(tituloText.props.style).toEqual(expect.objectContaining({
      color: '#BB86FC',
      fontSize: 16,
      fontWeight: 'bold',
    }));
  });

  it('debería llamar onPress cuando se presiona el botón', () => {
    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByText } = render(<Compra titulo="Compra" onPress={mockOnPress} />);

    // Simula el clic en el botón
    fireEvent.press(getByText('Compra'));

    // Verifica que la función onPress ha sido llamada
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
