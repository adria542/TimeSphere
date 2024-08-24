import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de instalar este paquete
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../controllers/controladorContexto';

export default function EditarActividad() {
  const [titulo, setTitulo] = useState('Título de la Actividad');
  const [duracion, setDuracion] = useState(''); // Cambiado a string
  const [tipoActividad, setTipoActividad] = useState('Deporte');
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const tiposActividad = ['Deporte', 'Estudio', 'Relajación', 'Trabajo'];

  const handleSave = () => {
    // Aquí puedes manejar la lógica para guardar la actividad
    console.log('Actividad guardada:', {
      titulo,
      duracion,
      tipoActividad,
    });
    navigation.navigate('views/EditarRutina');
  };

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('views/EditarRutina');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Imagen de ejemplo
        style={styles.image}
      />
      
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
          keyboardType="numeric" // Permite solo números
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente
    marginBottom: 20,
  },
  backButton: {
    left: 0,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007BFF',
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
    backgroundColor: '#fff', // Fondo blanco para el contenedor del Picker
    overflow: 'hidden', // Asegura que el borde redondeado se mantenga
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
    backgroundColor: '#121212', // Fondo oscuro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente
    marginBottom: 20,
  },
  backButton: {
    left: 0,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#BB86FC', // Color de texto en el modo oscuro
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
    color: '#E0E0E0', // Color del texto en modo oscuro
  },
  input: {
    borderWidth: 1,
    borderColor: '#333', // Color del borde en modo oscuro
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#1e1e1e', // Fondo oscuro del TextInput
    color: '#E0E0E0', // Color del texto en el TextInput
  },
  section: {
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#333', // Color del borde en modo oscuro
    borderRadius: 5,
    backgroundColor: '#1e1e1e', // Fondo oscuro para el contenedor del Picker
    overflow: 'hidden', // Asegura que el borde redondeado se mantenga
  },
  picker: {
    height: 60,
    width: '100%',
    color: '#E0E0E0', // Color del texto en el Picker
  },
  saveButton: {
    backgroundColor: '#BB86FC', // Color del botón en modo oscuro
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#121212', // Color del texto en el botón en modo oscuro
    fontSize: 16,
    fontWeight: '600',
  },
});
