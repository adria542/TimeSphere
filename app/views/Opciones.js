import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox'; // Asegúrate de instalar expo-checkbox

const Opciones = () => {
  // Estados para manejar los checkboxes
  const [vibracion, setVibracion] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [modoDaltonico, setModoDaltonico] = useState(false);
  const [sonido, setSonido] = useState(false); // Valor inicial del control deslizante

  // Maneja el toque en el botón "Volver"
  const handleBackPress = () => {
    Alert.alert('Volver', 'Botón volver presionado');
  };

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
            style={styles.checkbox} // Asegúrate de aplicar estilo al checkbox
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
            value={modoOscuro}
            onValueChange={setModoOscuro}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Modo Daltonico</Text>
          <Checkbox
            value={modoDaltonico}
            onValueChange={setModoDaltonico}
            style={styles.checkbox}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center', // Centra los contenidos horizontalmente
    justifyContent: 'center', // Centra los contenidos verticalmente
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
    color: '#007BFF',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Asegura que el título esté centrado en su contenedor
  },
  optionsContainer: {
    flex: 1,
    alignItems: 'center', // Centra los filtros horizontalmente
    width: '100%', // Asegura que el contenedor ocupe todo el ancho disponible
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%', // Ajusta el ancho según tus necesidades
    marginBottom: 10,
    justifyContent: 'space-between', // Espacia el texto y el checkbox
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    marginLeft: 10,
  },
});

export default Opciones;
