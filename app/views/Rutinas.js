import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import RutinaComponent from '../components/rutinas';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../controllers/controladorContexto';
import { useDay, useRutinaId } from '../controllers/controladorContexto';
import { Rutina } from '../models/rutina'; // Importa el modelo Rutina
import DaySelector from '../components/barraSemanal'; // Ajusta la ruta según sea necesario
import { Notificacion } from '../models/modeloNotificacion';
export default function Rutinas() {
  const { changeRutina, changeNotificacion } = useRutinaId();
  const { selectedDay } = useDay();
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook para saber si la pantalla está enfocada
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  // Estado para almacenar las rutinas cargadas desde Firebase
  const [rutinas, setRutinas] = useState([]);

  // Cargar rutinas desde Firebase cuando el componente se monta o cuando la pantalla está enfocada
  useEffect(() => {
    const cargarRutinas = async () => {
      try {
        const rutinasCargadas = await Rutina.getRutinasPorDia(selectedDay);
        console.log('Rutinas Cargadas:', rutinasCargadas);
        setRutinas(rutinasCargadas);
      } catch (error) {
        console.error("Error cargando rutinas:", error);
      }
    };

    if (isFocused) {
      cargarRutinas();
    }
  }, [selectedDay, isFocused]);

  const handlePress = async (rutinaId) => {
    await changeRutina(rutinaId)
    changeNotificacion(new Notificacion ('N' + date, false, false, false, 'notificacion'));
    navigation.navigate('views/EditarRutina');
  };

  const handlePressOptions = () => {
    navigation.navigate('views/Opciones');
  };

  const handlePressPlus = async () => {
    const date = Date.now().toString();
    await changeRutina(date);
    changeNotificacion(new Notificacion ('N' + date, false, false, false, 'notificacion'));
    navigation.navigate('views/CrearRutina');
  };

  return (
    <View style={styles.container}>
      {/* Primer componente: Botón de Configuración y Selector de Días */}
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handlePressOptions}>
          <MaterialIcons name="settings" size={24} color={isDarkMode ? "#BB86FC" : "blue"} />
        </TouchableOpacity>
        <DaySelector />
      </View>

      {/* Segundo componente: Lista de Rutinas */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContentContainer}>
        {rutinas.map((rutina) => (
          <RutinaComponent 
            key={rutina.id}
            titulo={rutina.titulo}
            hora={rutina.hora}
            imagen={rutina.imagen}
            onPress={() => handlePress(rutina.id)} // Pasa el ID de la rutina para su edición
          />
        ))}
      </ScrollView>

      {/* Botón de Agregar Rutina */}
      <TouchableOpacity style={styles.plusButton} onPress={handlePressPlus}>
        <MaterialIcons name="add" size={44} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  topComponent: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  scrollContentContainer: {
    flexGrow: 1, // Asegura que el ScrollView se expanda correctamente
    marginTop: 10,
  },
  plusButton: {
    margin: 20,
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 30,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
  },
  topComponent: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#1E1E1E', // Fondo un poco más claro para el componente superior
  },
  scrollContentContainer: {
    flexGrow: 1, // Asegura que el ScrollView se expanda correctamente
    marginTop: 10,
    backgroundColor: '#121212', // Fondo oscuro para la lista de scroll
  },
  plusButton: {
    margin: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#BB86FC', // Color morado para el botón de agregar (+)
    borderRadius: 30,
  },
});
