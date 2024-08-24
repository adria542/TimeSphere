import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Actividad from '../components/actividad'; // Asegúrate de usar la ruta correcta
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../controllers/controladorContexto';

const EditarRutina = () => {
  // Datos de ejemplo para las actividades
  const actividades = [
    { id: '1', imagen: { uri: 'https://example.com/imagen1.jpg' }, titulo: 'Actividad 1', hora: '10:00 AM' },
    { id: '2', imagen: { uri: 'https://example.com/imagen2.jpg' }, titulo: 'Actividad 2', hora: '11:00 AM' },
    // Agrega más actividades según sea necesario
  ];

  const navigation = useNavigation();

  const handleActivityPress = (actividad) => {
    // Implementa la lógica para manejar el toque en una actividad
    console.log('Actividad seleccionada:', actividad);
    navigation.navigate('views/EditarActividad')
  };
  
  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  const handleRutinaPress = () => {
    navigation.navigate('views/CrearRutina');
  };

  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleRutinaPress}>
        <Text style={styles.title}>Título de la Rutina</Text>
        <Text style={styles.subtitle}>
          Hora de Inicio: 08:00 AM {'\n'}
          Hora Final: 09:00 AM
        </Text>
      </TouchableOpacity>
      <ScrollView style={styles.activityList}>
        {actividades.map(actividad => (
          <TouchableOpacity key={actividad.id} onPress={() => handleActivityPress(actividad)}>
            <Actividad
              imagen={actividad.imagen}
              titulo={actividad.titulo}
              hora={actividad.hora}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('views/EditarActividad')} // Ajusta el nombre de la pantalla según sea necesario
        >
          <Text style={styles.buttonText}>Nueva actividad</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => navigation.navigate('views/rutinaActiva')} // Ajusta el nombre de la pantalla según sea necesario
        >
          <Text style={styles.buttonText}>Iniciar rutina</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff', // Fondo claro para el modo claro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  backButtonText: {
    color: 'blue', // Tono morado
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 30,
    color: '#000', // Color del título en modo claro
  },
  subtitle: {
    fontSize: 16,
    color: '#555', // Color del subtítulo en modo claro
    marginBottom: 40,
  },
  activityList: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007BFF', // Tono morado
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
  },
  playButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#121212', // Fondo oscuro para el modo oscuro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  backButtonText: {
    color: '#BB86FC', // Tono morado
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 30,
    color: '#e0e0e0', // Color del título en modo oscuro
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0', // Color del subtítulo en modo oscuro
    marginBottom: 40,
  },
  activityList: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007BFF', // Tono morado
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
  },
  playButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EditarRutina;
