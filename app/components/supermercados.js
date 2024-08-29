import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../controllers/controladorContexto';

const Supermercado = ({ nombre, direccion, etiquetas }) => {
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.supermercadoContainer} testID='SupermercadoContainer'>
      <Text style={styles.nombre} testID='nombre'>{nombre}</Text>
      <Text style={styles.direccion} testID='Dirección'>{direccion}</Text>
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

const lightStyles = StyleSheet.create({
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

const darkStyles = StyleSheet.create({
  supermercadoContainer: {
    backgroundColor: '#1E1E1E', // Fondo oscuro para el contenedor del supermercado
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
    color: '#FFFFFF', // Texto blanco para el nombre
  },
  direccion: {
    fontSize: 14,
    marginBottom: 10,
    color: '#BBBBBB', // Texto gris claro para la dirección
  },
  etiquetasContainer: {
    flexDirection: 'row',
  },
  etiqueta: {
    backgroundColor: '#BB86FC', // Color morado para las etiquetas
    color: '#000000', // Texto negro para las etiquetas
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 5,
    fontSize: 12,
  },
});

export default Supermercado;
