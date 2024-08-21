import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Articulo from '../components/articulo'; // Ajusta la ruta según tu estructura de archivos

export default function ListasDeLaCompra() {
  const navigation = useNavigation();

  const [articulos, setArticulos] = useState([
    { id: '1', nombre: 'Manzanas', imageSource: 'https://via.placeholder.com/50?text=Manzana' },
    { id: '2', nombre: 'Pan', imageSource: 'https://via.placeholder.com/50?text=Pan' },
    { id: '3', nombre: 'Leche', imageSource: 'https://via.placeholder.com/50?text=Leche' },
    { id: '4', nombre: 'Huevos', imageSource: 'https://via.placeholder.com/50?text=Huevos' },
  ]);

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  const handleListoPress = () => {
    navigation.navigate('_sitemap');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Lista de la Compra</Text>
      <ScrollView style={styles.articulosContainer}>
        {articulos.map((articulo) => (
          <Articulo
            key={articulo.id}
            imageSource={{ uri: articulo.imageSource }}
            nombreArticulo={articulo.nombre}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.botonListo} onPress={handleListoPress}>
        <Text style={styles.botonListoText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between', // Asegura que el botón "Listo" esté al fondo
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
