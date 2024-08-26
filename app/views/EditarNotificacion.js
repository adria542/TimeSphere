import React from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../controllers/controladorContexto';
import { useEditarNotificacion } from '../controllers/controladorEditarNotificaciones';

export default function EditarNotificacion() {
  const {
    textoNotificacion,
    setTextoNotificacion,
    sonidoActivado,
    setSonidoActivado,
    vibracionActivada,
    setVibracionActivada,
    handleGuardar,
    handleBackPress,
  } = useEditarNotificacion();

  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Editar Notificación</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Editar texto de la notificación:</Text>
        <TextInput
          style={styles.input}
          value={textoNotificacion}
          onChangeText={setTextoNotificacion}
          placeholder="Ingrese el texto de la notificación"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
        />
      </View>

      <View style={styles.sectionOptions}>
        <Text style={styles.label}>Sonido:</Text>
        <Switch
          value={sonidoActivado}
          onValueChange={setSonidoActivado}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={sonidoActivado ? '#007BFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.sectionOptions}>
        <Text style={styles.label}>Vibración:</Text>
        <Switch
          value={vibracionActivada}
          onValueChange={setVibracionActivada}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={vibracionActivada ? '#007BFF' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={handleGuardar}
      >
        <Text style={styles.doneButtonText}>Hecho</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  doneButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#1e1e1e',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#e0e0e0',
  },
  section: {
    marginBottom: 20,
  },
  sectionOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e0e0e0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#e0e0e0',
    backgroundColor: '#333',
  },
  doneButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
