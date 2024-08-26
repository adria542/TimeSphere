import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import Articulo from '../components/articulo'; // Ajusta la ruta según tu estructura de archivos
import { useTheme } from '../controllers/controladorContexto';
import { useEditarListaDeLaCompra } from '../controllers/controladorEditarListaDeLaCompra';

export default function EditarListaDeLaCompra() {
  const {
    articulos,
    loading,
    nombreLista,
    setNombreLista,
    articulosSeleccionados,
    toggleArticuloSeleccionado,
    handleBackPress,
    handleListoPress
  } = useEditarListaDeLaCompra();

  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Crear Lista de la Compra</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la lista"
        placeholderTextColor={isDarkMode ? "#BB86FC" : "#999"}
        value={nombreLista}
        onChangeText={setNombreLista}
      />
      <ScrollView style={styles.articulosContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={isDarkMode ? "#BB86FC" : "#0000ff"} />
        ) : (
          articulos.map((articulo) => (
            <Articulo
              key={articulo.id}
              imageSource={{ uri: articulo.imagen }}
              nombreArticulo={articulo.nombre}
              checked={articulosSeleccionados[articulo.id] || false}
              onToggle={() => toggleArticuloSeleccionado(articulo.id)}
            />
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.botonListo} onPress={handleListoPress}>
        <Text style={styles.botonListoText}>Guardar Lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000',
  },
  articulosContainer: {
    flex: 1,
  },
  botonListo: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonListoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

const darkStyles = StyleSheet.create({
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  backButtonText: {
    color: '#BB86FC',
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    justifyContent: 'space-between',
    backgroundColor: '#121212',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#E0E0E0',
  },
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#E0E0E0',
    backgroundColor: '#1e1e1e',
  },
  articulosContainer: {
    flex: 1,
  },
  botonListo: {
    backgroundColor: '#03DAC6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonListoText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '600',
  },
});
