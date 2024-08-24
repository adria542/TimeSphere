import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTheme, useRutinaId } from '../controllers/controladorContexto';
import { Rutina } from '../models/rutina';
import { Actividad } from '../models/modeloActividad';
import { useDay } from '../controllers/controladorContexto';

export default function EditarActividad() {
  const { selectedDay } = useDay();
  const { rutinaId, editandoActividad, actividadId } = useRutinaId();
  const [titulo, setTitulo] = useState('');
  const [duracion, setDuracion] = useState('');
  const [tipoActividad, setTipoActividad] = useState('Deporte');
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook para saber si la pantalla está enfocada

  const tiposActividad = ['Deporte', 'Estudio', 'Relajación', 'Trabajo'];

  useEffect(() => {
    console.log(editandoActividad)
    if (editandoActividad) {
      // Cargar los detalles de la actividad cuando editandoActividad es true
      const fetchActividad = async () => {
        try {
          // Obtener la rutina actual y buscar la actividad por ID
          const rutina = await Rutina.getRutinaPorId(rutinaId);
          if (rutina) {
            const actividad = rutina.actividades.find(act => act.id === actividadId);
            if (actividad) {
              setTitulo(actividad.titulo);
              setDuracion(actividad.duracion.toString());
              setTipoActividad(actividad.tipo);
            }
          }
          else {
            setTitulo('');
            setDuracion('');
            setTipoActividad('Deporte');
          }
        } catch (error) {
          console.error('Error al cargar la actividad:', error);
        }
      };
      if (isFocused) {
        fetchActividad();
      }
    }
  }, [editandoActividad, actividadId, rutinaId, isFocused]);

  const handleSave = async () => {
    try {
      if (editandoActividad) {
        // Actualizar la actividad existente
        const rutina = await Rutina.getRutinaPorId(rutinaId);
        if (rutina) {
          const actividadIndex = rutina.actividades.findIndex(act => act.id === actividadId);
          if (actividadIndex > -1) {
            rutina.actividades[actividadIndex] = new Actividad(
              actividadId, // Usar el mismo ID para actualizar
              titulo,
              tipoActividad,
              'https://firebasestorage.googleapis.com/v0/b/timesphere-b6efd.appspot.com/o/png-clipart-symbolize-x.png?alt=media&token=9cff17e8-cfa9-4e0b-b207-827b8251304e',
              parseInt(duracion, 10)
            );
            await rutina.save(selectedDay);
          }
        }
      } else {
        // Crear una nueva actividad
        const nuevaActividad = new Actividad(
          'A' + Date.now().toString(),
          titulo,
          tipoActividad,
          'https://firebasestorage.googleapis.com/v0/b/timesphere-b6efd.appspot.com/o/png-clipart-symbolize-x.png?alt=media&token=9cff17e8-cfa9-4e0b-b207-827b8251304e',
          parseInt(duracion, 10)
        );

        // Obtener la rutina actual y añadir la nueva actividad
        const rutina = await Rutina.getRutinaPorId(rutinaId);
        if (rutina) {
          rutina.actividades.push(nuevaActividad);
          await rutina.save(selectedDay);
        }
      }

      // Navegar de vuelta a la vista de edición de rutina
      navigation.navigate('views/EditarRutina');
    } catch (error) {
      console.error('Error al guardar la actividad:', error);
    }
  };

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
    marginBottom: 20,
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
