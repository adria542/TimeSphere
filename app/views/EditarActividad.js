import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../controllers/controladorContexto';
import { useEditarActividad } from '../controllers/controladorEditarActividades';

export default function EditarActividad() {
  const {
    titulo,
    setTitulo,
    duracion,
    setDuracion,
    tipoActividad,
    setTipoActividad,
    tiposActividad,
    handleSave,
    handleBackPress,
  } = useEditarActividad();

  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      
      <Text style={styles.label}>Título de la Actividad:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <View style={styles.section}>
        <Text style={styles.label}>Duración (minutos):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={duracion}
          onChangeText={setDuracion}
          placeholder="Ingrese duración en minutos"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Tipo de Actividad:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoActividad}
            style={styles.picker}
            onValueChange={(itemValue) => setTipoActividad(itemValue)}
          >
            {tiposActividad.map((tipo, index) => (
              <Picker.Item key={index} label={tipo} value={tipo} />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Guardar Actividad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#121212',
  },
  backButton: {
    marginBottom: 30,
  },
  backButtonText: {
    color: '#BB86FC',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#E0E0E0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    color: '#E0E0E0',
  },
  section: {
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    backgroundColor: '#1e1e1e',
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    width: '100%',
    color: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '600',
  },
});
