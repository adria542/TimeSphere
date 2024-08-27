import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useShortSpan } from '../controllers/controladorContexto';
import { Rutina } from '../models/modeloRutina'; // Asegúrate de que esta ruta sea correcta

export function useRutinaActivaController() {
  const { rutinaId } = useShortSpan();
  const navigation = useNavigation();
  const [actividad, setActividad] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchRutina = async () => {
      const rutinaData = await Rutina.getRutinaPorId(rutinaId);
      if (rutinaData) {
        setRutina(rutinaData);
        if (rutinaData.actividades.length > 0) {
          setActividad(rutinaData.actividades[0]);
        }
      }
    };
    fetchRutina();
  }, [rutinaId]);

  useEffect(() => {
    if (rutina && rutina.actividades.length > 0) {
      setActividad(rutina.actividades[currentActivityIndex]);
    }
  }, [currentActivityIndex, rutina]);

  const handleBackPress = useCallback(() => {
    navigation.navigate('_sitemap');
  }, [navigation]);

  const handlePlayPress = useCallback(() => {
    setIsPlaying(true);
    console.log('Reproducir actividad');
  }, []);

  const handlePausePress = useCallback(() => {
    setIsPlaying(false);
    console.log('Pausar actividad');
  }, []);

  const handleSkipPress = useCallback(async () => {
    if (rutina && rutina.actividades.length > 0) {
      const nextIndex = (currentActivityIndex + 1) % rutina.actividades.length;
      if (nextIndex === 0) {
        navigation.navigate('_sitemap');
      } else {
        setCurrentActivityIndex(nextIndex);
        setActividad(rutina.actividades[nextIndex]);
      }
      setIsPlaying(false); // Detiene el contador al saltar a la siguiente actividad
    }
  }, [rutina, currentActivityIndex, navigation]);

  return {
    actividad,
    isPlaying,
    handleBackPress,
    handlePlayPress,
    handlePausePress,
    handleSkipPress,
    setIsPlaying
  };
}
