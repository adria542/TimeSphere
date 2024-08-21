import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Actividad from '../components/actividad'; // Asegúrate de usar la ruta correcta
import { useNavigation } from '@react-navigation/native';

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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
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
    backgroundColor: '#007BFF',
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
