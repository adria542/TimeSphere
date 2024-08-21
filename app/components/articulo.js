import React, { useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox'; // Asegúrate de instalar expo-checkbox

export default function articulo({ imageSource, nombreArticulo }) {
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

const styles = StyleSheet.create({
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
  },
  checkbox: {
    marginLeft: 10,
  },
});
