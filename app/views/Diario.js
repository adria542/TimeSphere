import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';

export default function Diario() {
  const [estadoEmocional, setEstadoEmocional] = useState('../components/Asests/CaraFeliz.png'); // Estado para guardar la emoción seleccionada
  const [textoDiario, setTextoDiario] = useState(''); // Estado para guardar el texto del diario

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <Button title="" onPress={() => alert('Botón presionado')} />
      </View>
      {/* Título con la fecha */}
      <Text style={styles.fechaTitulo}>Jueves 16</Text>

      {/* Sección de Seguimiento Emocional */}
      <View style={styles.emocionalSection}>
        <Text style={styles.titulo}>Estado emocional del día</Text>
        
        <View style={styles.emocionWrapper}>
          {/* Imagen que muestra el estado emocional seleccionado */}
          {estadoEmocional && (
            <Image source={estadoEmocional} style={styles.emocionImagen} />
          )}
          
          {/* Botones para seleccionar la emoción */}
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

const styles = StyleSheet.create({
   topComponent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Para separar los botones
      padding: 10,
    },
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: '#fff', // Fondo blanco
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    textAlignVertical: 'top', // Para que el texto comience desde la parte superior
  },
});
