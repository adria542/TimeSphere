import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTheme, useDay, useRutinaId } from '../controllers/controladorContexto';
import { Rutina } from '../models/modeloRutina'; // Asegúrate de que esta ruta sea correcta
import { Notificacion } from '../models/modeloNotificacion';

export function useRutinasController() {
  const { changeRutina, changeNotificacion } = useRutinaId();
  const { selectedDay } = useDay();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { isDarkMode } = useTheme();

  const [rutinas, setRutinas] = useState([]);

  // Cargar rutinas desde Firebase
  useEffect(() => {
    const cargarRutinas = async () => {
      try {
        const rutinasCargadas = await Rutina.getRutinasPorDia(selectedDay);
        console.log('Rutinas Cargadas:', rutinasCargadas);
        setRutinas(rutinasCargadas);
      } catch (error) {
        console.error('Error cargando rutinas:', error);
      }
    };

    if (isFocused) {
      cargarRutinas();
    }
  }, [selectedDay, isFocused]);

  const handlePress = useCallback(async (rutinaId) => {
    await changeRutina(rutinaId);
    navigation.navigate('views/EditarRutina');
  }, [changeRutina, navigation]);

  const handlePressOptions = useCallback(() => {
    navigation.navigate('views/Opciones');
  }, [navigation]);

  const handlePressPlus = useCallback(async () => {
    const date = Date.now().toString();
    await changeRutina(date);
    changeNotificacion(new Notificacion('N' + date, false, false, false, 'notificacion'));
    navigation.navigate('views/CrearRutina');
  }, [changeRutina, changeNotificacion, navigation]);

  return {
    rutinas,
    isDarkMode,
    handlePress,
    handlePressOptions,
    handlePressPlus,
  };
}
