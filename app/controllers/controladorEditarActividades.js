// useEditarActividad.js

import { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Rutina } from '../models/modeloRutina';
import { Actividad } from '../models/modeloActividad';
import { useDay } from '../controllers/controladorContexto';
import { useShortSpan } from '../controllers/controladorContexto';

export function useEditarActividad() {
  const { selectedDay } = useDay();
  const { rutinaId, editandoActividad, actividadId } = useShortSpan();
  const [titulo, setTitulo] = useState('');
  const [duracion, setDuracion] = useState('');
  const [tipoActividad, setTipoActividad] = useState('Deporte');
  const isFocused = useIsFocused(); // Hook para saber si la pantalla está enfocada
  const navigation = useNavigation();

  const tiposActividad = ['Deporte', 'Estudio', 'Relajación', 'Trabajo', 'Higiene'];

  useEffect(() => {
    if (editandoActividad && isFocused) {
      const fetchActividad = async () => {
        try {
          const rutina = await Rutina.getRutinaPorId(rutinaId);
          if (rutina) {
            const actividad = rutina.actividades.find(act => act.id === actividadId);
            if (actividad) {
              setTitulo(actividad.nombre);
              setDuracion(actividad.duracion.toString());
              setTipoActividad(actividad.tipo);
            }
          } else {
            resetForm();
          }
        } catch (error) {
          console.error('Error al cargar la actividad:', error);
          resetForm();
        }
      };
      fetchActividad();
    }
  }, [editandoActividad, actividadId, rutinaId, isFocused]);

  const resetForm = () => {
    setTitulo('');
    setDuracion('');
    setTipoActividad('Deporte');
  };

  const handleSave = async () => {
    try {
      const rutina = await Rutina.getRutinaPorId(rutinaId);
      if (editandoActividad) {
        if (rutina) {
          const actividadIndex = rutina.actividades.findIndex(act => act.id === actividadId);
          if (actividadIndex > -1) {
            rutina.actividades[actividadIndex] = new Actividad(
              actividadId,
              titulo,
              tipoActividad,
              'https://firebasestorage.googleapis.com/v0/b/timesphere-b6efd.appspot.com/o/png-clipart-symbolize-x.png?alt=media&token=9cff17e8-cfa9-4e0b-b207-827b8251304e',
              parseInt(duracion, 10)
            );
            await rutina.save(selectedDay);
          }
        }
      } else {
        const nuevaActividad = new Actividad(
          'A' + Date.now().toString(),
          titulo,
          tipoActividad,
          'https://firebasestorage.googleapis.com/v0/b/timesphere-b6efd.appspot.com/o/png-clipart-symbolize-x.png?alt=media&token=9cff17e8-cfa9-4e0b-b207-827b8251304e',
          parseInt(duracion, 10)
        );
        if (rutina) {
          rutina.actividades.push(nuevaActividad);
          await rutina.save(selectedDay);
        }
      }
      navigation.navigate('views/EditarRutina');
    } catch (error) {
      console.error('Error al guardar la actividad:', error);
    }
  };

  const handleBackPress = () => {
    navigation.navigate('views/EditarRutina');
  };

  return {
    titulo,
    setTitulo,
    duracion,
    setDuracion,
    tipoActividad,
    setTipoActividad,
    tiposActividad,
    handleSave,
    handleBackPress,
  };
}
