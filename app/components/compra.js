import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Compra = ({ titulo, onPress }) => {
  return (
    <TouchableOpacity style={styles.compraContainer} onPress={onPress}>
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
