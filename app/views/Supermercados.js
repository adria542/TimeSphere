import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Supermercado from '../components/supermercados';
import Compra from '../components/compra';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Supermercados() {
  const [selectedButton, setSelectedButton] = useState('left'); // Estado para seguir el botón seleccionado
  const navigation = useNavigation();

  const handlePress = () => {
    // Navega a la pantalla RutinaActiva
    navigation.navigate('views/Filtros');
  };

  const handleCompra = () => {
    // Navega a la pantalla RutinaActiva
    navigation.navigate('views/ListasDeLaCompra');
  };

  const handlePressOptions = () => {
    // Navega a la pantalla RutinaActiva
    navigation.navigate('views/Opciones');
  };
  const isDarkMode = false;
  const styles = isDarkMode ? darkStyles : lightStyles;

  // Datos de supermercados
  const supermercados = [
    { nombre: 'Supermercado Uno', direccion: 'Calle Falsa 123', etiquetas: ['Accesible', 'Baños adaptados'] },
    { nombre: 'Supermercado Dos', direccion: 'Avenida Siempre Viva 742', etiquetas: ['Estacionamiento adaptado', 'Asientos disponibles'] },
    { nombre: 'Supermercado Tres', direccion: 'Calle Elm 456', etiquetas: ['Accesible', 'Pasillos anchos'] },
    { nombre: 'Supermercado Cuatro', direccion: 'Calle Luna 789', etiquetas: ['Accesible', 'Personal capacitado'] },
    { nombre: 'Supermercado Cinco', direccion: 'Avenida Sol 101', etiquetas: ['Estacionamiento adaptado', 'Pasillos anchos'] },
  ];

  // Datos de compras
  const compras = [
    'Compra 1',
    'Compra 2',
    'Compra 3',
    'Compra 4',
    'Compra 5',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handlePressOptions}>
          <MaterialIcons name="settings" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      <View style={styles.topComponent}>
        {/* Botón izquierdo */}
        <TouchableOpacity 
          style={[styles.button, styles.leftButton]} 
          onPress={() => setSelectedButton('left')}
        >
          <Text style={{ color: selectedButton === 'left' ? 'black' : 'gray' }}>
            Supermercados
          </Text>
        </TouchableOpacity>
        {/* Botón derecho */}
        <TouchableOpacity 
          style={[styles.button, styles.rightButton]} 
          onPress={() => setSelectedButton('right')}
        >
          <Text style={{ color: selectedButton === 'right' ? 'black' : 'gray' }}>
            Listas de la compra
          </Text>
        </TouchableOpacity>
      </View>
      {/* Botón filtros solo visible si selectedButton no es 'right' */}
      {selectedButton !== 'right' && (
        <View>
          <TouchableOpacity 
            style={[styles.button, styles.rightButton]} onPress={handlePress}
          >
            <Text style={{ color: 'gray' }}>
              Filtros
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.contenedorLista}>
        <ScrollView style={styles.lista}>
          {selectedButton === 'left' ? (
            supermercados.map((supermercado, index) => (
              <Supermercado
                key={index}
                nombre={supermercado.nombre}
                direccion={supermercado.direccion}
                etiquetas={supermercado.etiquetas}
              />
            ))
          ) : (
            compras.map((compra, index) => (
              <Compra
                key={index}
                titulo={compra}
                onPress={handleCompra}
              />
            ))
          )}
        </ScrollView>
      </View>
      {/* botón + */}
      {selectedButton !== 'left' && (
          <TouchableOpacity style={styles.plusButton} onPress={handleCompra}>
            <MaterialIcons name="add" size={44} color="white" />
          </TouchableOpacity>
        )}
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para separar los botones
    padding: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    width: '40%',
  },
  leftButton: {
    alignSelf: 'flex-start',
  },
  rightButton: {
    alignSelf: 'flex-end',
  },
  contenedorLista: {
    flex: 1,
    padding: 10,
  },
  lista: {
    flex: 1,
  },
  plusButton: {
    margin: 20,
    size: 0,
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 30,
  },
});
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para separar los botones
    padding: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    width: '40%',
  },
  leftButton: {
    alignSelf: 'flex-start',
  },
  rightButton: {
    alignSelf: 'flex-end',
  },
  contenedorLista: {
    flex: 1,
    padding: 10,
  },
  lista: {
    flex: 1,
  },
  plusButton: {
    margin: 20,
    size: 0,
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 30,
  },
});
