import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Compra = ({ titulo }) => {
  // Función que maneja el toque
  const handlePress = () => {
    Alert.alert('Compra seleccionada', `Has seleccionado: ${titulo}`);
  };

  return (
    <TouchableOpacity style={styles.compraContainer} onPress={handlePress}>
      <Text style={styles.titulo}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  compraContainer: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Compra;
