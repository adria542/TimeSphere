import React from 'react';
import { render, act } from '@testing-library/react-native';
import ContadorDescendente from '../../components/contador';
import { useTheme } from '../../controllers/controladorContexto';

jest.mock('../../controllers/controladorContexto', () => ({
  useTheme: jest.fn(),
}));

describe('ContadorDescendente', () => {
  const mockOnFinish = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it('debería renderizar con el estilo correcto en modo claro', () => {
    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByTestId } = render(<ContadorDescendente duracion={120} isPlaying={false} onFinish={mockOnFinish} index={0} />);

    const container = getByTestId('contador-container');
    expect(container.props.style).toEqual(expect.objectContaining({
      backgroundColor: '#fff',
      borderColor: '#ccc',
    }));

    const text = getByTestId('contador-text');
    expect(text.props.style).toEqual(expect.objectContaining({
      color: '#000',
      fontSize: 40,
      fontWeight: 'bold',
    }));
  });

  it('debería renderizar con el estilo correcto en modo oscuro', () => {
    useTheme.mockReturnValue({
      isDarkMode: true,
    });

    const { getByTestId } = render(<ContadorDescendente duracion={120} isPlaying={false} onFinish={mockOnFinish} index={0} />);

    const container = getByTestId('contador-container');
    expect(container.props.style).toEqual(expect.objectContaining({
      backgroundColor: '#333',
      borderColor: '#555',
    }));

    const text = getByTestId('contador-text');
    expect(text.props.style).toEqual(expect.objectContaining({
      color: '#fff',
      fontSize: 40,
      fontWeight: 'bold',
    }));
  });

  it('debería contar hacia abajo y llamar onFinish cuando llegue a cero', () => {
    jest.useFakeTimers();
    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByTestId } = render(<ContadorDescendente duracion={2} isPlaying={true} onFinish={mockOnFinish} index={0} />);

    act(() => {
      jest.advanceTimersByTime(1000); // 1 segundo
    });

    expect(getByTestId('contador-text').children[0]).toBe('0:01');

    act(() => {
      jest.advanceTimersByTime(1000); // 1 segundo
    });

    expect(getByTestId('contador-text').children[0]).toBe('0:00');

    act(() => {
      jest.advanceTimersByTime(1000); // 1 segundo
    });

    expect(mockOnFinish).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('debería resetear el temporizador cuando cambia la duración', () => {
    jest.useFakeTimers();
    useTheme.mockReturnValue({
      isDarkMode: false,
    });

    const { getByTestId, rerender } = render(<ContadorDescendente duracion={300} isPlaying={true} onFinish={mockOnFinish} index={0} />); // Actividad con duración de 5 minutos

    act(() => {
      jest.advanceTimersByTime(60000); // 1 minuto
    });

    expect(getByTestId('contador-text').children[0]).toBe('4:00');

    // Cambia la duración
    rerender(<ContadorDescendente duracion={600} isPlaying={true} onFinish={mockOnFinish} index={1} />); // Actividad con duración de 10 minutos

    expect(getByTestId('contador-text').children[0]).toBe('10:00');

    jest.useRealTimers();
  });
});
