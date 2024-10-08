import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useTheme, useDay } from '../controllers/controladorContexto';
import { useDiarioController } from '../controllers/controladorDiario';

const estadosAnimo = {
  0: require('../components/Asests/png-clipart-symbolize-x.png'),
  1: require('../components/Asests/CaraFeliz.png'),
  2: require('../components/Asests/CaraTriste.png')
};

export default function Diario() {
  const { diaDiario } = useDay();
  const { cargarDiario, guardarDiario, handleBackPress } = useDiarioController();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const [estadoEmocional, setEstadoEmocional] = useState(0);
  const [textoDiario, setTextoDiario] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const diario = await cargarDiario();
      if (diario) {
        setEstadoEmocional(diario.estadoEmocional);
        setTextoDiario(diario.entradaDiario);
      }
    };
    fetchData();
  }, [cargarDiario]);

  const getFormattedDate = () => {
    if (diaDiario) {
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const date = new Date(diaDiario);
      const dayName = dayNames[date.getDay()];
      const dayNumber = date.getDate();
      return `${dayName} ${dayNumber}`;
    }
    return 'Fecha no disponible';
  };

  const getEstadoAnimo = (int) => estadosAnimo[int] || null;

  const handleSavePress = async () => {
    await guardarDiario(estadoEmocional, textoDiario);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.fechaTitulo}>{getFormattedDate()}</Text>

      <View style={styles.emocionalSection}>
        <Text style={styles.titulo}>Estado emocional del día</Text>
        <View style={styles.emocionWrapper}>
          <TouchableOpacity>
            <Image 
              source={getEstadoAnimo(estadoEmocional)} 
              style={styles.iconoEmocion} 
            />
          </TouchableOpacity>
          <View style={styles.seleccionEmocion}>
            <TouchableOpacity onPress={() => setEstadoEmocional(1)}>
              <Image 
                source={require('../components/Asests/CaraFeliz.png')} 
                style={styles.iconoEmocion} 
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEstadoEmocional(2)}>
              <Image 
                source={require('../components/Asests/CaraTriste.png')} 
                style={styles.iconoEmocion} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

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

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
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
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
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
    justifyContent: 'space-between',
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
  saveButton: {
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#121212',
    fontSize: 16,
  },
});
