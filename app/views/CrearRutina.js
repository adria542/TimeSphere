import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../controllers/controladorContexto';
import { useCrearRutinaController } from '../controllers/controladorCrearRutina';

export default function CrearRutina() {
  const { cargarDatosRutina, guardarRutina, handleBackPress, handleModificarNotificacion } = useCrearRutinaController();
  const [titulo, setTitulo] = useState('');
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [mostrarHoraPicker, setMostrarHoraPicker] = useState(false);
  const [actividades, setActividades] = useState([]);
  const [notificacionesActivadas, setNotificacionesActivadas] = useState(false);
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  useEffect(() => {
    const fetchData = async () => {
      const rutina = await cargarDatosRutina();
      if (rutina) {
        setTitulo(rutina.titulo);
        if (rutina.hora) {
          const [hours, minutes] = rutina.hora.split(':');
          const date = new Date();
          date.setHours(hours);
          date.setMinutes(minutes);
          setHoraInicio(date);
        }
        if (rutina.notificacion) {
          setNotificacionesActivadas(rutina.notificacion.activa);
        }
      }
    };

    fetchData();
  }, []);

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || horaInicio;
    setMostrarHoraPicker(Platform.OS === 'ios');
    setHoraInicio(currentDate);
  };

  const toggleNotificaciones = () => {
    setNotificacionesActivadas((previousState) => !previousState);
  };

  const handleHecho = async () => {
    await guardarRutina(titulo, horaInicio, actividades);
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
        placeholderTextColor={isDarkMode ? '#B0B0B0' : '#6e6e6e'}
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
          <Text style={styles.modifyNotificationText}>Modificar Notificación</Text>
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
    justifyContent: 'center',
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
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
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
    color: '#000',
  },
  switch: {
    marginRight: 20,
  },
  modifyNotificationButtonContainer: {
    minHeight: 50,
    justifyContent: 'center',
  },
  hidden: {
    opacity: 0,
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
    color: '#000',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#BB86FC',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#1e1e1e',
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
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    maxWidth: '70%',
  },
  timeText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
  },
  switch: {
    marginRight: 20,
  },
  modifyNotificationButtonContainer: {
    minHeight: 50,
    justifyContent: 'center',
  },
  hidden: {
    opacity: 0,
  },
  modifyNotificationButton: {
    backgroundColor: '#BB86FC',
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
    backgroundColor: '#03DAC6',
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
    color: '#fff',
  },
});
