import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de instalar este paquete
import { useNavigation } from '@react-navigation/native';

export default function EditarActividad() {
  const [titulo, setTitulo] = useState('Título de la Actividad');
  const [duracion, setDuracion] = useState(''); // Cambiado a string
  const [tipoActividad, setTipoActividad] = useState('Deporte');

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

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Guardar Actividad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
