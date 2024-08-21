import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditarNotificacion() {
  const [textoNotificacion, setTextoNotificacion] = useState('');
  const [sonidoActivado, setSonidoActivado] = useState(false);
  const [vibracionActivada, setVibracionActivada] = useState(false);
  const isDarkMode = false;
  const styles = isDarkMode ? darkStyles : lightStyles;

  const handleGuardar = () => {
    // Aquí puedes manejar la lógica para guardar la configuración de la notificación
    console.log('Configuración de notificación guardada:', {
      textoNotificacion,
      sonidoActivado,
      vibracionActivada,
    });
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
        />
      </View>

      <View style={styles.sectionOptions}>
        <Text style={styles.label}>Sonido:</Text>
        <Switch
          value={sonidoActivado}
          onValueChange={setSonidoActivado}
        />
      </View>

      <View style={styles.sectionOptions}>
        <Text style={styles.label}>Vibración:</Text>
        <Switch
          value={vibracionActivada}
          onValueChange={setVibracionActivada}
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
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
title: {
  fontSize: 24,
  fontWeight: '600',
  marginBottom: 20,
  textAlign: 'center',
},
sectionOptions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 20,
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
