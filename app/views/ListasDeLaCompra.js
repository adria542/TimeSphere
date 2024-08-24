import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Articulo from '../components/articulo'; // Ajusta la ruta según tu estructura de archivos
import { useTheme } from '../controllers/controladorContexto';

export default function ListasDeLaCompra() {
  const navigation = useNavigation();

  const [articulos, setArticulos] = useState([
    { id: '1', nombre: 'Manzanas', imageSource: 'https://via.placeholder.com/50?text=Manzana' },
    { id: '2', nombre: 'Pan', imageSource: 'https://via.placeholder.com/50?text=Pan' },
  ]);

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  const handleListoPress = () => {
    navigation.navigate('views/EditarListaDeLaCompra');
  };

  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

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
        <Text style={styles.botonListoText}>Editar lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff', // Fondo blanco para el modo claro
    justifyContent: 'space-between', // Asegura que el botón "Listo" esté al fondo
  },
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
    color: '#007BFF', // Color del botón "Volver" en el modo claro
    fontSize: 16,
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

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#121212', // Fondo oscuro para el modo oscuro
    justifyContent: 'space-between', // Asegura que el botón "Listo" esté al fondo
  },
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
    color: '#BB86FC', // Color del botón "Volver" en el modo oscuro
    fontSize: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff', // Color del título en el modo oscuro
  },
  articulosContainer: {
    flex: 1,
  },
  botonListo: {
    backgroundColor: '#03DAC6', // Color del botón en modo oscuro
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonListoText: {
    color: '#121212', // Color del texto en el botón en modo oscuro
    fontSize: 16,
    fontWeight: '600',
  },
});
