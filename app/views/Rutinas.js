import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Rutina from '../components/rutinas';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../controllers/controladorContexto';
import { useDay } from '../controllers/controladorContexto';

// Importa tu propio componente DaySelector
import DaySelector from '../components/barraSemanal'; // Ajusta la ruta según sea necesario

export default function Rutinas() {
  const { selectedDay } = useDay();
  const navigation = useNavigation();
  
  const handlePress = (titulo) => {
    navigation.navigate('views/EditarRutina', { titulo });
  };

  const handlePressOptions = () => {
    navigation.navigate('views/Opciones');
  };

  const handlePressPlus = () => {
    navigation.navigate('views/CrearRutina');
  };

  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

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
        <Rutina titulo="Hacer ejercicio" hora="07:00 AM" imagen="https://example.com/imagen1.jpg" onPress={() => handlePress("Hacer ejercicio")} />
        <Rutina titulo="Desayuno" hora="08:00 AM" imagen="https://example.com/imagen2.jpg" onPress={() => handlePress("Desayuno")} />
        <Rutina titulo="Reunión de trabajo" hora="09:00 AM" imagen="https://example.com/imagen3.jpg" onPress={() => handlePress("Reunión de trabajo")} />
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
