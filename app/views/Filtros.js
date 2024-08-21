import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

const Filtros = () => {
  const navigation = useNavigation();
  const isDarkMode = false;
  const styles = isDarkMode ? darkStyles : lightStyles;
  
  // Estado para manejar los checkboxes
  const [checkedItems, setCheckedItems] = useState({});

  // Maneja el toque en el botón "Volver"
  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  // Maneja el cambio en el checkbox
  const handleCheckboxChange = (id) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id], // Cambia el estado actual del checkbox
    }));
  };

  // Tipos de accesibilidad
  const accesibilidad = [
    { id: 1, titulo: 'Rampas' },
    { id: 2, titulo: 'Baños accesibles' },
    { id: 3, titulo: 'Espacios amplios' },
    { id: 4, titulo: 'Señalización Braille' },
  ];

  return (
    <View style={styles.container}>
      {/* Fila con el botón "Volver" y el título "Filtros" */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filtros</Text>
      </View>
      {/* Lista de tipos de accesibilidad */}
      <View style={styles.accesibilidadContainer}>
        {accesibilidad.map(item => (
          <View key={item.id} style={styles.accesibilidadRow}>
            <Text style={styles.accesibilidadText}>{item.titulo}</Text>
            <Checkbox
              value={checkedItems[item.id] || false}
              onValueChange={() => handleCheckboxChange(item.id)}
              style={styles.checkbox} // Asegúrate de aplicar estilo al checkbox
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  accesibilidadContainer: {
    flex: 1,
    alignItems: 'center', // Centra los filtros horizontalmente
  },
  accesibilidadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%', // Ajusta el ancho según tus necesidades
    marginBottom: 10,
    justifyContent: 'space-between', // Espacia el texto y el checkbox
  },
  accesibilidadText: {
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    marginLeft: 10,
  },
});
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  accesibilidadContainer: {
    flex: 1,
    alignItems: 'center', // Centra los filtros horizontalmente
  },
  accesibilidadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%', // Ajusta el ancho según tus necesidades
    marginBottom: 10,
    justifyContent: 'space-between', // Espacia el texto y el checkbox
  },
  accesibilidadText: {
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    marginLeft: 10,
  },
});
export default Filtros;
