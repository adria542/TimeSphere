// useEditarRutina.js
import { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useRutinaId, useDay } from '../controllers/controladorContexto';
import { Rutina } from '../models/rutina'; // Importa el modelo Rutina

export function useEditarRutina() {
  const { rutinaId, changeStateTrue, changeStateFalse, changeActividad, changeNotificacion } = useRutinaId();
  const { selectedDay } = useDay();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [rutina, setRutina] = useState(null);
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const cargarRutina = async () => {
      try {
        const rutinaCargada = await Rutina.getRutinaPorId(rutinaId);
        changeNotificacion(rutinaCargada.notificacion);
        setRutina(rutinaCargada);
        setActividades(rutinaCargada?.actividades || []);
      } catch (error) {
        console.error("Error cargando rutina:", error);
      }
    };

    if (isFocused) {
      cargarRutina();
    }
  }, [rutinaId, isFocused]);

  const getHoraFinal = () => {
    if (!rutina) return 'Desconocida';

    const convertToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const convertToTimeStr = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    let horaInicialEnMinutos = convertToMinutes(rutina.hora);
    let duracionTotal = 0;
    rutina.actividades.forEach(actividad => {
      duracionTotal += actividad.duracion;
    });
    const horaFinalEnMinutos = horaInicialEnMinutos + duracionTotal;
    return convertToTimeStr(horaFinalEnMinutos);
  };

  const handleActivityPress = (actividad) => {
    changeStateTrue();
    changeActividad(actividad.id);
    navigation.navigate('views/EditarActividad');
  };

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  const handleRutinaPress = async () => {
    await changeStateFalse();
    navigation.navigate('views/CrearRutina');
  };

  const handleNuevaActividad = async () => {
    await changeStateFalse();
    navigation.navigate('views/EditarActividad');
  };

  return {
    rutina,
    actividades,
    getHoraFinal,
    handleActivityPress,
    handleBackPress,
    handleRutinaPress,
    handleNuevaActividad
  };
}
