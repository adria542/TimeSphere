import React, { useState } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox'; // Asegúrate de instalar expo-checkbox
import { useTheme } from '../controllers/controladorContexto';

export default function Articulo({ imageSource, nombreArticulo }) {
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const [checked, setChecked] = useState(false);

  const toggleCheckBox = () => {
    setChecked(!checked);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleCheckBox}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.nombre}>{nombreArticulo}</Text>
      <Checkbox
        value={checked}
        onValueChange={toggleCheckBox}
        style={styles.checkbox}
      />
    </TouchableOpacity>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  nombre: {
    flex: 1,
    fontSize: 16,
    color: '#000', // Color del texto en modo claro
  },
  checkbox: {
    marginLeft: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e', // Fondo oscuro para el modo oscuro
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#333', // Color del borde en modo oscuro
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  nombre: {
    flex: 1,
    fontSize: 16,
    color: '#e0e0e0', // Color del texto en modo oscuro
  },
  checkbox: {
    marginLeft: 10,
  },
});
