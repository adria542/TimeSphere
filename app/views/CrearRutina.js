import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Platform, ScrollView,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CrearRutina() {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [mostrarHoraPicker, setMostrarHoraPicker] = useState(false);
  const [notificacionesActivadas, setNotificacionesActivadas] = useState(false);
  const isDarkMode = false;
  const styles = isDarkMode ? darkStyles : lightStyles;

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || horaInicio;
    setMostrarHoraPicker(Platform.OS === 'ios');
    setHoraInicio(currentDate);
  };

  const toggleNotificaciones = () => {
    setNotificacionesActivadas((previousState) => !previousState);
  };

  const handleHecho = () => {
    navigation.navigate('_sitemap');
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
        value={titulo}
        onChangeText={setTitulo}
      />

      <View style={styles.section}>
        <Text style={styles.label}>Hora de Inicio:</Text>
        <TouchableOpacity
          style={styles.timePickerButton}
          onPress={() => setMostrarHoraPicker(true)}
        >
          <MaterialIcons name="access-time" size={24} color="#000" />
          <Text style={styles.timeText}>
            {horaInicio.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {mostrarHoraPicker && (
        <DateTimePicker
          value={horaInicio}
          mode="time"
          display="default"
          onChange={onChangeHora}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente
    marginBottom: 20,
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
});
const darkStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', // Distribuye el contenido
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente
    marginBottom: 20,
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
});