// useEditarNotificacion.js

import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Notificacion } from '../models/modeloNotificacion';
import { useShortSpan } from '../controllers/controladorContexto';

export function useEditarNotificacion() {
  const [textoNotificacion, setTextoNotificacion] = useState('');
  const [sonidoActivado, setSonidoActivado] = useState(false);
  const [vibracionActivada, setVibracionActivada] = useState(false);
  const { changeNotificacion, notificacion } = useShortSpan();
  const navigation = useNavigation();

  useEffect(() => {
    const cargarNotificacion = async () => {
      if (notificacion) {
        setTextoNotificacion(notificacion.titulo);
        setVibracionActivada(notificacion.vibracion);
        setSonidoActivado(notificacion.sonido);
      }
    };

    cargarNotificacion();
  }, [notificacion]);

  const handleGuardar = () => {
    const not = new Notificacion(
      'D' + Date.now().toString(),
      true,
      sonidoActivado,
      vibracionActivada,
      textoNotificacion,
    );
    changeNotificacion(not);
    navigation.navigate('views/CrearRutina');
  };

  const handleBackPress = () => {
    navigation.navigate('views/CrearRutina');
  };

  return {
    textoNotificacion,
    setTextoNotificacion,
    sonidoActivado,
    setSonidoActivado,
    vibracionActivada,
    setVibracionActivada,
    handleGuardar,
    handleBackPress,
  };
}
