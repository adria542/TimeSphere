import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../controllers/controladorContexto';

const Rutina = ({ titulo, hora, imagen, onPress }) => {
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <TouchableOpacity onPress={onPress} style={styles.rutinaContainer}>
      <Image source={{ uri: imagen }} style={styles.imagen} />
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.hora}>{hora}</Text>
      </View>
    </TouchableOpacity>
  );
};

const lightStyles = StyleSheet.create({
  rutinaContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  imagen: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  hora: {
    fontSize: 16,
    color: '#666',
  },
});
const darkStyles = StyleSheet.create({
  rutinaContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E', // Fondo oscuro para la tarjeta
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  imagen: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto blanco para contraste
  },
  hora: {
    fontSize: 16,
    color: '#BBBBBB', // Texto gris claro para la hora
  },
});

export default Rutina;
