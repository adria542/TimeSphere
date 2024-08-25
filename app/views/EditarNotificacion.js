import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme, useRutinaId, useDay} from '../controllers/controladorContexto';
import { useNavigation } from '@react-navigation/native';
import { Notificacion } from '../models/modeloNotificacion';

export default function EditarNotificacion() {
  const [textoNotificacion, setTextoNotificacion] = useState('');
  const [sonidoActivado, setSonidoActivado] = useState(false);
  const [vibracionActivada, setVibracionActivada] = useState(false);
  const { isDarkMode } = useTheme();
  const {changeNotificacion, notificacion, rutinaId} = useRutinaId();
  const styles = isDarkMode ? darkStyles : lightStyles;

  useEffect(() => {
    const cargarNotificacion = async () => {
      if (notificacion) {
        try {
          console.log(notificacion)
          if (notificacion) {
            setTextoNotificacion(notificacion.titulo);
            setVibracionActivada(notificacion.vibracion);
            setSonidoActivado(notificacion.sonido)
          } else {
            console.log('No se encontró una entrada de diario para este día.');
          }
        } catch (error) {
          console.error('Error al cargar el diario:', error);
        }
      }
    };

    cargarNotificacion();
  }, [notificacion]);

  const handleGuardar = () => {
    // Aquí puedes manejar la lógica para guardar la configuración de la notificación
    console.log('Configuración de notificación guardada:', {
      textoNotificacion,
      sonidoActivado,
      vibracionActivada,
    });
    const not = new Notificacion(
      'D' + Date.now().toString(),
      true,
      sonidoActivado,
      vibracionActivada,
      textoNotificacion,
    );
    changeNotificacion(not)
    navigation.navigate('views/CrearRutina');
  };

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('views/CrearRutina');
  };

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
    backgroundColor: '#1e1e1e', // Fondo oscuro para el modo oscuro
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
    color: '#e0e0e0', // Color del texto en modo oscuro
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
    color: '#e0e0e0', // Color del texto en modo oscuro
  },
  input: {
    borderWidth: 1,
    borderColor: '#444', // Color del borde en modo oscuro
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#e0e0e0', // Color del texto en el input
    backgroundColor: '#333', // Fondo del input en modo oscuro
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
