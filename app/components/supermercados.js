import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Supermercado = ({ nombre, direccion, etiquetas }) => {
  return (
    <View style={styles.supermercadoContainer}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.direccion}>{direccion}</Text>
      <FlatList
        data={etiquetas}
        renderItem={({ item }) => <Text style={styles.etiqueta}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        style={styles.etiquetasContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  supermercadoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  direccion: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  etiquetasContainer: {
    flexDirection: 'row',
  },
  etiqueta: {
    backgroundColor: '#007BFF',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 5,
    fontSize: 12,
  },
});

export default Supermercado;
