import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Actividad from '../components/actividad'; // Asegúrate de usar la ruta correcta
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { useTheme, useDay, useRutinaId } from '../controllers/controladorContexto';
import { Rutina } from '../models/rutina'; // Importa el modelo Rutina

const EditarRutina = () => {
  const { rutinaId, changeStateTrue, changeStateFalse, changeActividad, changeNotificacion } = useRutinaId();
  const { selectedDay } = useDay();
  const route = useRoute(); // Hook para obtener los parámetros de navegación
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook para saber si la pantalla está enfocada

  const [rutina, setRutina] = useState(null);
  const [actividades, setActividades] = useState([]);

  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  // Cargar los datos de la rutina al montar el componente
  useEffect(() => {
    const cargarRutina = async () => {
      try {
        const rutinaCargada = await Rutina.getRutinaPorId(rutinaId);
        changeNotificacion(rutinaCargada.notificacion)
        setRutina(rutinaCargada);
        // Verifica que rutinaCargada y rutinaCargada.actividades estén definidos
        setActividades(rutinaCargada?.actividades || []);
        console.log(rutinaCargada?.actividades)
        console
      } catch (error) {
        console.error("Error cargando rutina:", error);
      }
    };
    if (isFocused) {
      cargarRutina();
    }
  }, [rutinaId, isFocused]);

  const handleActivityPress = (actividad) => {
    // Implementa la lógica para manejar el toque en una actividad
    console.log('Actividad seleccionada:', actividad);
    changeStateTrue();
    changeActividad(actividad.id);
    navigation.navigate('views/EditarActividad');
  };

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  const getHoraFinal = () => {
    if (!rutina) return 'Desconocida'; // Devuelve un valor por defecto si rutina es null

    const convertToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };
    const convertToTimeStr = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };
    let horaInicialEnMinutos = convertToMinutes(rutina.hora);
    let duracionTotal = 0;
    rutina.actividades.forEach(actividad => {
      duracionTotal += actividad.duracion; // Asegúrate de que 'duracion' esté en minutos
    });
    const horaFinalEnMinutos = horaInicialEnMinutos + duracionTotal;
    const horaFinal = convertToTimeStr(horaFinalEnMinutos);
    return horaFinal;
  };

  const handleRutinaPress = async () => {
    await changeStateFalse();
    navigation.navigate('views/CrearRutina');
  };

  const handleNuevaActividad = async () => {
    await changeStateFalse();
    navigation.navigate('views/EditarActividad');
  };

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
                    hora={`Duración: ${actividad.duracion} mins`} // Asegúrate de que `hora` sea una cadena
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
              onPress={handleNuevaActividad} // Ajusta el nombre de la pantalla según sea necesario
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

export default EditarRutina;
