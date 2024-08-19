import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Rutina = ({ titulo, hora, imagen, onPress }) => {
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

const styles = StyleSheet.create({
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

export default Rutina;
