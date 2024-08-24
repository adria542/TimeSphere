import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../controllers/controladorContexto';
import { useDay } from '../controllers/controladorContexto';
import { Rutina } from '../models/rutina'; // Importa el modelo Rutina
import { Notificacion } from '../models/modeloNotificacion';

export default function CrearRutina() {
  const { selectedDay } = useDay();
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [mostrarHoraPicker, setMostrarHoraPicker] = useState(false);
  const [actividades, setActividades] = useState([])
  const [notificacion, setNotificacion] = useState(new Notificacion('N' + Date.now().toString(), false, false, false, 'notificación'))
  const [notificacionesActivadas, setNotificacionesActivadas] = useState(false);
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || horaInicio;
    setMostrarHoraPicker(Platform.OS === 'ios');
    setHoraInicio(currentDate);
  };

  const toggleNotificaciones = () => {
    notificacion.cambiarEstadoActiva();
    setNotificacionesActivadas((previousState) => !previousState);
  };

  const handleHecho = async () => {
      try {
      const nuevaRutina = new Rutina(
        // Genera un ID único para la rutina, por ejemplo usando un timestamp
        Date.now().toString(), 
        actividades, // Puedes inicializar con actividades si tienes alguna
        notificacion, // Inicializa notificaciones si es necesario
        horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        'https://firebasestorage.googleapis.com/v0/b/timesphere-b6efd.appspot.com/o/png-clipart-symbolize-x.png?alt=media&token=9cff17e8-cfa9-4e0b-b207-827b8251304e', // Inicializa con una imagen si es necesario
        titulo
      );
      await nuevaRutina.save(selectedDay); // Guarda la rutina en la base de datos
      // Navega a la vista principal o a donde quieras después de guardar
      navigation.navigate('_sitemap', { refresh: true });
    } catch (error) {
      console.error("Error guardando la rutina:", error);
    }
  };

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  const handleModificarNotificacion = () => {
    // Lógica para modificar la notificación
    console.log('Modificar notificación');
    navigation.navigate('views/EditarNotificacion');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Título de la Rutina:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el título de la rutina"
        placeholderTextColor={isDarkMode ? '#B0B0B0' : '#6e6e6e'} // Placeholder color en modo oscuro
        value={titulo}
        onChangeText={setTitulo}
      />

      <View style={styles.section}>
        <Text style={styles.label}>Hora de Inicio:</Text>
        <TouchableOpacity
          style={styles.timePickerButton}
          onPress={() => setMostrarHoraPicker(true)}
        >
          <MaterialIcons name="access-time" size={24} color={styles.iconColor.color} />
          <Text style={styles.timeText}>
            {horaInicio.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {mostrarHoraPicker && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={horaInicio}
            mode="time"
            display="default"
            onChange={onChangeHora}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Notificaciones:</Text>
        <Switch
          value={notificacionesActivadas}
          onValueChange={toggleNotificaciones}
          style={styles.switch}
        />
      </View>

      <View style={[styles.modifyNotificationButtonContainer, notificacionesActivadas ? {} : styles.hidden]}>
        <TouchableOpacity
          style={styles.modifyNotificationButton}
          onPress={handleModificarNotificacion}
        >
          <Text style={styles.modifyNotificationText}>
            Modificar Notificación
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleHecho}>
        <Text style={styles.doneButtonText}>Hecho</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', // Distribuye el contenido
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000', // Color del texto
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#000', // Color del texto del input
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    maxWidth: '70%',
  },
  timeText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000', // Color del texto de la hora
  },
  switch: {
    marginRight: 20,
  },
  modifyNotificationButtonContainer: {
    minHeight: 50, // Reserva espacio para el botón
    justifyContent: 'center', // Centra verticalmente el botón
  },
  hidden: {
    opacity: 0, // Oculta el botón pero reserva el espacio
  },
  modifyNotificationButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  modifyNotificationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: '#28A745',
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
  iconColor: {
    color: '#000', // Color del icono en modo claro
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212', // Fondo oscuro
    justifyContent: 'center', // Distribuye el contenido
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#BB86FC', // Color del texto en modo oscuro
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#fff', // Color del texto en modo oscuro
  },
  input: {
    borderWidth: 1,
    borderColor: '#333', // Color del borde en modo oscuro
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#fff', // Color del texto del input en modo oscuro
    backgroundColor: '#1e1e1e', // Fondo del input en modo oscuro
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333', // Color del borde en modo oscuro
    borderRadius: 5,
    padding: 10,
    maxWidth: '70%',
  },
  timeText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#fff', // Color del texto de la hora en modo oscuro
  },
  switch: {
    marginRight: 20,
  },
  modifyNotificationButtonContainer: {
    minHeight: 50, // Reserva espacio para el botón
    justifyContent: 'center', // Centra verticalmente el botón
  },
  hidden: {
    opacity: 0, // Oculta el botón pero reserva el espacio
  },
  modifyNotificationButton: {
    backgroundColor: '#BB86FC', // Botón de notificación en modo oscuro
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  modifyNotificationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: '#03DAC6', // Botón "Hecho" en modo oscuro
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
  iconColor: {
    color: '#fff', // Color del icono en modo oscuro
  },
});
