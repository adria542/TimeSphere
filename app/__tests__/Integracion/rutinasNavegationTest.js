import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'; // Utiliza @testing-library/react-hooks para los hooks
import { useShortSpan } from '../../controllers/controladorContexto'; // Ajusta la ruta según sea necesario
import { useRutinasController } from '../../controllers/controladorRutinas'; // Ajusta la ruta según sea necesario
import { useEditarRutina } from '../../controllers/controladorEditarRutina'; // Ajusta la ruta según sea necesario
import { useCrearRutinaController } from '../../controllers/controladorCrearRutina'; // Ajusta la ruta según sea necesario

// Mockear useShortSpan
jest.mock('../../controllers/controladorContexto', () => {
  return {
    useShortSpan: jest.fn(() => ({
      changeRutina: jest.fn(),
      changeNotificacion: jest.fn(),
      rutinaId: 'rutinaId123',
      notificacion: 'notificacionTest'
    }))
  };
});

describe('Modificaciones en useShortSpan', () => {
  it('debería llamar a changeRutina y cambiar rutinaId cuando se presiona handlePress en RutinasController', async () => {
    const { result } = renderHook(() => useRutinasController());

    await act(async () => {
      await result.current.handlePress('rutinaId123');
    });

    // Verificar que changeRutina ha sido llamado con el id correcto
    expect(useShortSpan().changeRutina).toHaveBeenCalledWith('rutinaId123');
    // Verificar que rutinaId ha cambiado
    expect(result.current.rutinas).toEqual(expect.any(Array)); // Asume que rutinas debería ser un array tras cargar
  });

  it('debería llamar a changeRutina y changeNotificacion cuando se presiona handlePressPlus en RutinasController', async () => {
    const { result } = renderHook(() => useRutinasController());

    await act(async () => {
      await result.current.handlePressPlus();
    });

    // Verificar que changeRutina y changeNotificacion han sido llamados
    expect(useShortSpan().changeRutina).toHaveBeenCalled();
    expect(useShortSpan().changeNotificacion).toHaveBeenCalled();
  });

  it('debería llamar a changeStateTrue y changeActividad cuando se presiona handleActivityPress en EditarRutina', async () => {
    const { result } = renderHook(() => useEditarRutina());

    await act(async () => {
      await result.current.handleActivityPress({ id: 'actividadId123' });
    });

    // Verificar que changeStateTrue y changeActividad han sido llamados
    expect(useShortSpan().changeStateTrue).toHaveBeenCalled();
    expect(useShortSpan().changeActividad).toHaveBeenCalledWith('actividadId123');
  });

  it('debería llamar a changeStateFalse cuando se presiona handleRutinaPress en EditarRutina', async () => {
    const { result } = renderHook(() => useEditarRutina());

    await act(async () => {
      await result.current.handleRutinaPress();
    });

    // Verificar que changeStateFalse ha sido llamado
    expect(useShortSpan().changeStateFalse).toHaveBeenCalled();
  });

  it('debería llamar a handleBackPress en CrearRutinaController', () => {
    const { result } = renderHook(() => useCrearRutinaController());

    act(() => {
      result.current.handleBackPress();
    });

    // Verificar que handleBackPress ha sido llamado
    expect(useCrearRutinaController().handleBackPress).toHaveBeenCalled();
  });
});
