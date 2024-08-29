// __tests__/DaySelector.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DaySelector from '../../components/barraSemanal';
import { useDay, useTheme } from '../../controllers/controladorContexto';

// Mock de los hooks
jest.mock('../../controllers/controladorContexto', () => ({
  useDay: jest.fn(),
  useTheme: jest.fn(),
}));

describe('DaySelector', () => {
  const mockChangeDay = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar los días y aplicar el estilo correcto en modo claro', () => {
    // Configuración del mock para modo claro
    useDay.mockReturnValue({
      selectedDay: new Date(), // Cambia la fecha a la nueva fecha de inicio
      changeDay: mockChangeDay,
    });

    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByText } = render(<DaySelector />);

    // Verifica que los días se renderizan
    expect(getByText('lun 26')).toBeTruthy();
    expect(getByText('mar 27')).toBeTruthy();
    expect(getByText('mié 28')).toBeTruthy();
    expect(getByText('jue 29')).toBeTruthy();
    expect(getByText('vie 30')).toBeTruthy();
    expect(getByText('sáb 31')).toBeTruthy();
    expect(getByText('dom 1')).toBeTruthy();

    // Verifica el estilo del día seleccionado
    const selectedDayText = getByText('mié 28');
    expect(selectedDayText.props.style).toEqual(expect.arrayContaining([{
      color: '#007BFF',
      fontWeight: 'bold',
      backgroundColor: '#E6F0FF',
      borderRadius: 5,
      paddingVertical: 3,
      paddingHorizontal: 6,
    }]));
  });

  it('debería manejar el cambio de día', () => {
    const selectedDay = new Date(2024, 7, 26); // Día inicial
    useDay.mockReturnValue({
      selectedDay: selectedDay,
      changeDay: mockChangeDay,
    });

    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByText } = render(<DaySelector />);

    // Simula el clic en el día "mié 28"
    fireEvent.press(getByText('mié 28'));

    // Verifica que changeDay ha sido llamado con el día correcto
    const expectedDate = new Date(2024, 7, 28); // Día esperado

    // Extrae el año, mes y día de la llamada
    expect(mockChangeDay).toHaveBeenCalledWith(expect.any(Date));

    const call = mockChangeDay.mock.calls[0][0];
    expect(call.getFullYear()).toBe(expectedDate.getFullYear());
    expect(call.getMonth()).toBe(expectedDate.getMonth());
    expect(call.getDate()).toBe(expectedDate.getDate());
  });

  it('debería aplicar el estilo correcto en modo oscuro', () => {
    useDay.mockReturnValue({
      selectedDay: new Date(),
      changeDay: mockChangeDay,
    });

    useTheme.mockReturnValue({
      isDarkMode: true,
    });

    const { getByText } = render(<DaySelector />);

    // Verifica que el estilo se aplica en modo oscuro
    const selectedDayText = getByText('mié 28');
    expect(selectedDayText.props.style).toEqual(expect.arrayContaining([{
      color: '#BB86FC',
      fontWeight: 'bold',
      backgroundColor: '#3E3A57',
      borderRadius: 5,
      paddingVertical: 3,
      paddingHorizontal: 6,
    }]));
  });
});
