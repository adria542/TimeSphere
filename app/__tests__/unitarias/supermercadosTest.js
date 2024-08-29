// __tests__/Supermercado.test.js

import React from 'react';
import { render } from '@testing-library/react-native';
import Supermercado from '../../components/supermercados';
import { useTheme } from '../../controllers/controladorContexto';

// Mock del hook useTheme
jest.mock('../../controllers/controladorContexto', () => ({
  useTheme: jest.fn(),
}));

describe('Supermercado', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar con el estilo correcto en modo claro', () => {
    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByTestId, getAllByText } = render(
      <Supermercado
        nombre="Supermercado ABC"
        direccion="Calle Falsa 123"
        etiquetas={['Frutas', 'Verduras', 'Lácteos']}
      />
    );

    // Verifica el estilo del contenedor en modo claro
    const supermercadoContainer = getByTestId('SupermercadoContainer');
    expect(supermercadoContainer.props.style).toEqual(expect.objectContaining({
      backgroundColor: '#f0f0f0',
    }));

    // Verifica el estilo del nombre en modo claro
    const nombreText = getByTestId('nombre');
    expect(nombreText.props.style).toEqual(expect.objectContaining({
      fontSize: 18,
      fontWeight: 'bold',
    }));

    // Verifica el estilo de la dirección en modo claro
    const direccionText = getByTestId('Dirección');
    expect(direccionText.props.style).toEqual(expect.objectContaining({
      fontSize: 14,
      color: '#555',
    }));

    // Verifica las etiquetas en la FlatList
    const etiquetas = getAllByText(/Frutas|Verduras|Lácteos/);
    etiquetas.forEach(etiqueta => {
      expect(etiqueta.props.style).toEqual(expect.objectContaining({
        backgroundColor: '#007BFF',
        color: '#fff',
      }));
    });
  });

  it('debería renderizar con el estilo correcto en modo oscuro', () => {
    useTheme.mockReturnValue({
      isDarkMode: true,
    });

    const { getByTestId, getAllByText } = render(
      <Supermercado
        nombre="Supermercado XYZ"
        direccion="Avenida Siempre Viva 742"
        etiquetas={['Snacks', 'Bebidas', 'Panadería']}
      />
    );

    // Verifica el estilo del contenedor en modo oscuro
    const supermercadoContainer = getByTestId('SupermercadoContainer');
    expect(supermercadoContainer.props.style).toEqual(expect.objectContaining({
      backgroundColor: '#1E1E1E',
    }));

    // Verifica el estilo del nombre en modo oscuro
    const nombreText = getByTestId('nombre');
    expect(nombreText.props.style).toEqual(expect.objectContaining({
      color: '#FFFFFF',
    }));

    // Verifica el estilo de la dirección en modo oscuro
    const direccionText = getByTestId('Dirección');
    expect(direccionText.props.style).toEqual(expect.objectContaining({
      color: '#BBBBBB',
    }));

    // Verifica las etiquetas en la FlatList
    const etiquetas = getAllByText(/Snacks|Bebidas|Panadería/);
    etiquetas.forEach(etiqueta => {
      expect(etiqueta.props.style).toEqual(expect.objectContaining({
        backgroundColor: '#BB86FC',
        color: '#000000',
      }));
    });
  });
});
