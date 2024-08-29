// components/ContadorDescendente.js

import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../controllers/controladorContexto';

const ContadorDescendente = ({ duracion, isPlaying, onFinish, index }) => {
  const [tiempoRestante, setTiempoRestante] = useState(duracion);
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  useEffect(() => {
    setTiempoRestante(duracion); // Reinicia el contador cuando cambie la duración
  }, [index, duracion]);

  useEffect(() => {
    let intervalo;

    if (isPlaying) {
      intervalo = setInterval(() => {
        setTiempoRestante((prevTiempo) => {
          if (prevTiempo <= 0) {
            clearInterval(intervalo);
            if (onFinish) {
              onFinish(); // Llama a la función onFinish cuando el contador llega a cero
            }
            return 0;
          }
          return prevTiempo - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [isPlaying, onFinish]);

  const formatTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${minutos}:${seg < 10 ? `0${seg}` : seg}`;
  };

  return (
    <View style={styles.container} testID="contador-container">
      <Text style={styles.text} testID="contador-text">{formatTiempo(tiempoRestante)}</Text>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Fondo claro para el modo claro
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000', // Color del texto en modo claro
  },
});

const darkStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333', // Fondo oscuro para el modo oscuro
    padding: 10,
    borderRadius: 5,
    borderColor: '#555',
    borderWidth: 1,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff', // Color del texto en modo oscuro
  },
});

export default ContadorDescendente;
