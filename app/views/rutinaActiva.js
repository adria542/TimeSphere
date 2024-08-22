import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../controllers/controladorContexto';

const RutinaActiva = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  // Maneja el toque en el botón "Volver"
  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  return (
    <View style={styles.container}>
      {/* Fila con el botón "Volver" y el título */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Rutina Activa</Text>
      </View>
      
      {/* Imagen grande */}
      <Image 
        source={{ uri: 'https://via.placeholder.com/300' }} // Usa tu propia URL o imagen local
        style={styles.image}
      />
      
      {/* Texto con el tiempo */}
      <Text style={styles.time}>10:31</Text>
      
      {/* Contenedor para los íconos */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/50?text=Pause' }} // Reemplaza con imagen de pausa
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/50?text=Play' }} // Reemplaza con imagen de play
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/50?text=Skip' }} // Reemplaza con imagen de skip
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center', // Centra horizontalmente el contenido
    justifyContent: 'center', // Centra verticalmente el contenido
    backgroundColor: '#fff', // Fondo blanco para el modo claro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente
    marginBottom: 20,
    width: '100%', // Asegura que el header ocupe todo el ancho disponible
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Asegura que el título esté centrado en su contenedor
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'cover', // Ajusta la imagen para cubrir el contenedor
  },
  time: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%', // Ajusta el ancho según tus necesidades
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain', // Mantiene la proporción de la imagen
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center', // Centra horizontalmente el contenido
    justifyContent: 'center', // Centra verticalmente el contenido
    backgroundColor: '#121212', // Fondo oscuro para el modo oscuro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente
    marginBottom: 20,
    width: '100%', // Asegura que el header ocupe todo el ancho disponible
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Asegura que el título esté centrado en su contenedor
    color: '#fff', // Color del título en el modo oscuro
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'cover', // Ajusta la imagen para cubrir el contenedor
  },
  time: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Color del tiempo en el modo oscuro
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%', // Ajusta el ancho según tus necesidades
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain', // Mantiene la proporción de la imagen
  },
});

export default RutinaActiva;
