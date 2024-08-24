import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../controllers/controladorContexto';
import { useDay } from '../controllers/controladorContexto';

export default function Diario() {
  const { diaDiario } = useDay(); // selectedDay ya es un objeto Date
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const [estadoEmocional, setEstadoEmocional] = useState(require('../components/Asests/CaraFeliz.png'));
  const [textoDiario, setTextoDiario] = useState('');

  // Función para obtener el nombre del día y el número del día
  const getFormattedDate = () => {
    if (diaDiario) {
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const date = new Date(diaDiario);
      const dayName = dayNames[date.getDay()]; // Nombre del día
      const dayNumber = date.getDate(); // Número del día
      return `${dayName} ${dayNumber}`;
    }
    return 'Fecha no disponible'; // En caso de que no haya una fecha seleccionada
  };

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
      {/* Título con la fecha */}
      <Text style={styles.fechaTitulo}>{getFormattedDate()}</Text>

      {/* Sección de Seguimiento Emocional */}
      <View style={styles.emocionalSection}>
        <Text style={styles.titulo}>Estado emocional del día</Text>
        <View style={styles.emocionWrapper}>
          {estadoEmocional && (
            <Image source={estadoEmocional} style={styles.emocionImagen} />
          )}
          <View style={styles.seleccionEmocion}>
            <TouchableOpacity onPress={() => setEstadoEmocional(require('../components/Asests/CaraFeliz.png'))}>
              <Image source={require('../components/Asests/CaraFeliz.png')} style={styles.iconoEmocion} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEstadoEmocional(require('../components/Asests/CaraTriste.png'))}>
              <Image source={require('../components/Asests/CaraTriste.png')} style={styles.iconoEmocion} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sección del Diario */}
      <View style={styles.diarioSection}>
        <Text style={styles.titulo}>Diario del día</Text>
        <TextInput
          style={styles.diarioInput}
          multiline={true}
          placeholder="Escribe aquí tu diario..."
          value={textoDiario}
          onChangeText={setTextoDiario}
        />
      </View>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  fechaTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  emocionalSection: {
    marginBottom: 30,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emocionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emocionImagen: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  seleccionEmocion: {
    flexDirection: 'row',
  },
  iconoEmocion: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  diarioSection: {
    flex: 1,
  },
  diarioInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
});

const darkStyles = StyleSheet.create({
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  backButtonText: {
    color: '#BB86FC',
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#121212',
  },
  fechaTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#E0E0E0',
  },
  emocionalSection: {
    marginBottom: 30,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E0E0E0',
  },
  emocionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emocionImagen: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  seleccionEmocion: {
    flexDirection: 'row',
  },
  iconoEmocion: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  diarioSection: {
    flex: 1,
  },
  diarioInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1e1e1e',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    color: '#E0E0E0',
    textAlignVertical: 'top',
  },
});
