// components/Compra.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../controllers/controladorContexto';

const Compra = ({ titulo, onPress }) => {
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <TouchableOpacity 
      style={styles.compraContainer} 
      onPress={onPress}
      testID="compra-container" // Añadido testID para pruebas
    >
      <Text style={styles.titulo}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const lightStyles = StyleSheet.create({
  compraContainer: {
    backgroundColor: '#007BFF', // Color del fondo del botón en modo claro
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: '#fff', // Color del texto en modo claro
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const darkStyles = StyleSheet.create({
  compraContainer: {
    backgroundColor: '#1E1E1E', // Color del fondo del botón en modo oscuro
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: '#BB86FC', // Color del texto en modo oscuro
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Compra;
