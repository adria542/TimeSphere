import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../controllers/controladorContexto';

const Actividad = ({ imagen, titulo, hora }) => {
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <Image source={imagen} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.time}>{hora}</Text>
      </View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Fondo claro
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd', // Borde gris claro
    padding: 10,
    marginVertical: 5,
    elevation: 2, // Sombras para Android
    shadowColor: '#000', // Sombras para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000', // Color del título en modo claro
  },
  time: {
    fontSize: 14,
    color: '#888', // Color del tiempo en modo claro
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333', // Fondo oscuro
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444', // Borde gris oscuro
    padding: 10,
    marginVertical: 5,
    elevation: 2, // Sombras para Android
    shadowColor: '#000', // Sombras para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#fff', // Color del título en modo oscuro
  },
  time: {
    fontSize: 14,
    color: '#ccc', // Color del tiempo en modo oscuro
  },
});

export default Actividad;
