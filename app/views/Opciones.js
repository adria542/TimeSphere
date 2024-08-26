import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox'; // Asegúrate de instalar expo-checkbox
import { useNavigation } from '@react-navigation/native';
import { useOpcionesController } from '../controllers/controladorOpciones'; // Importa el controlador

const Opciones = () => {
  const navigation = useNavigation();
  const {
    vibracion,
    setVibracion,
    sonido,
    setSonido,
    isDarkMode,
    handleModoOscuroChange
  } = useOpcionesController();

  // Maneja el toque en el botón "Volver"
  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  // Definición de estilos basada en el modo oscuro
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      {/* Fila con el botón "Volver" y el título "Opciones" */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Opciones</Text>
      </View>
      {/* Lista de opciones */}
      <View style={styles.optionsContainer}>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Sonido</Text>
          <Checkbox
            value={sonido}
            onValueChange={setSonido}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Vibración</Text>
          <Checkbox
            value={vibracion}
            onValueChange={setVibracion}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Modo Oscuro</Text>
          <Checkbox
            value={isDarkMode}
            onValueChange={handleModoOscuroChange}
            style={styles.checkbox}
          />
        </View>
      </View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Fondo claro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 20,
    width: '100%',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    marginLeft: 10,
    width: 30, // Aumenta el tamaño del checkbox
    height: 30, // Aumenta el tamaño del checkbox
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212', // Fondo oscuro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 80,
    paddingBottom: 20,
    width: '100%',
    backgroundColor: '#1E1E1E', // Fondo un poco más claro para el componente superior
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  backButtonText: {
    color: '#BB86FC', // Color del texto en modo oscuro
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF', // Color del título en modo oscuro
  },
  optionsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    color: '#FFFFFF', // Color del texto en modo oscuro
  },
  checkbox: {
    marginLeft: 10,
    width: 30, // Aumenta el tamaño del checkbox
    height: 30, // Aumenta el tamaño del checkbox
  },
});

export default Opciones;
