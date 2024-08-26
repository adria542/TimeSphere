// controladorCrearRutina.js

import { useNavigation } from '@react-navigation/native';
import { useDay, useRutinaId } from './controladorContexto';
import { Rutina } from '../models/rutina';

export function useCrearRutinaController() {
  const { changeNotificacion, rutinaId, notificacion } = useRutinaId();
  const { selectedDay } = useDay();
  const navigation = useNavigation();

  const cargarDatosRutina = async () => {
    try {
      const rutina = await Rutina.getRutinaPorId(rutinaId);
      return rutina;
    } catch (error) {
      console.error('Error al cargar la rutina:', error);
      return null;
    }
  };

  const guardarRutina = async (titulo, horaInicio, actividades) => {
    try {
      const nuevaRutina = new Rutina(
        rutinaId,
        actividades,
        notificacion,
        horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        'https://firebasestorage.googleapis.com/v0/b/timesphere-b6efd.appspot.com/o/png-clipart-symbolize-x.png?alt=media&token=9cff17e8-cfa9-4e0b-b207-827b8251304e',
        titulo
      );
      await nuevaRutina.save(selectedDay);
      navigation.navigate('_sitemap', { refresh: true });
    } catch (error) {
      console.error("Error guardando la rutina:", error);
    }
  };

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  const handleModificarNotificacion = () => {
    changeNotificacion(notificacion);
    navigation.navigate('views/EditarNotificacion');
  };

  return {
    cargarDatosRutina,
    guardarRutina,
    handleBackPress,
    handleModificarNotificacion,
  };
}
