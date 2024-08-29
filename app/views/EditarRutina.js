import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Actividad from '../components/actividad'; // Asegúrate de usar la ruta correcta
import { useTheme } from '../controllers/controladorContexto';
import { useEditarRutina } from '../controllers/controladorEditarRutina';
import { useNavigation } from '@react-navigation/native';

const EditarRutina = () => {
  const {
    rutina,
    actividades,
    getHoraFinal,
    handleActivityPress,
    handleBackPress,
    handleRutinaPress,
    handleNuevaActividad
  } = useEditarRutina();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>

      {rutina ? (
        <>
          <TouchableOpacity onPress={handleRutinaPress}>
            <Text style={styles.title}>{rutina.titulo}</Text>
            <Text style={styles.subtitle}>
              Hora de Inicio: {rutina.hora} {'\n'}
              Hora Final: {getHoraFinal()}
            </Text>
          </TouchableOpacity>
          <ScrollView style={styles.activityList}>
            {actividades.length > 0 ? (
              actividades.map(actividad => (
                <TouchableOpacity key={actividad.id} onPress={() => handleActivityPress(actividad)}>
                  <Actividad
                    imagen={actividad.imagen}
                    titulo={actividad.nombre}
                    hora={`Duración: ${actividad.duracion} mins`}
                    tipo={actividad.tipo}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.loading}>No hay actividades disponibles</Text>
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleNuevaActividad}
            >
              <Text style={styles.buttonText}>Nueva actividad</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => navigation.navigate('views/rutinaActiva')}
            >
              <Text style={styles.buttonText}>Iniciar rutina</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.loading}>Cargando...</Text>
      )}
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
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
    color: 'blue',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 30,
    color: '#000',
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
  },
  playButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#121212',
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
    color: '#BB86FC',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 30,
    color: '#e0e0e0',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
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
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#03DAC6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EditarRutina;
