import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Supermercado from '../components/supermercados';
import Compra from '../components/compra';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../controllers/controladorContexto';

export default function Supermercados() {
  const [selectedButton, setSelectedButton] = useState('left'); // Estado para seguir el botón seleccionado
  const navigation = useNavigation();

  const handlePress = () => {
    // Navega a la pantalla Filtros
    navigation.navigate('views/Filtros');
  };

  const handleCompra = () => {
    // Navega a la pantalla ListasDeLaCompra
    navigation.navigate('views/ListasDeLaCompra');
  };
  const handleAñadir = () => {
    // Navega a la pantalla ListasDeLaCompra
    navigation.navigate('views/EditarListaDeLaCompra');
  };

  const handlePressOptions = () => {
    // Navega a la pantalla Opciones
    navigation.navigate('views/Opciones');
  };

  const { isDarkMode } = useTheme();
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
          <MaterialIcons name="settings" size={24} color={isDarkMode ? "#BB86FC" : "blue"} />
        </TouchableOpacity>
      </View>
      <View style={styles.topComponent2}>
        {/* Botón izquierdo */}
        <TouchableOpacity 
          style={[styles.button, styles.leftButton]} 
          onPress={() => setSelectedButton('left')}
        >
          <Text style={{ color: selectedButton === 'left' ? (isDarkMode ? '#BB86FC' : 'blue') : (isDarkMode ? '#888888' : 'gray') }}>
            Supermercados
          </Text>
        </TouchableOpacity>

        {/* Botón derecho */}
        <TouchableOpacity 
          style={[styles.button, styles.rightButton]} 
          onPress={() => setSelectedButton('right')}
        >
          <Text style={{ color: selectedButton === 'right' ? (isDarkMode ? '#BB86FC' : 'blue') : (isDarkMode ? '#888888' : 'gray') }}>
            Listas de la compra
          </Text>
        </TouchableOpacity>
      </View>
      {selectedButton !== 'right' && (
        <View style={styles.topComponent3}>
          <TouchableOpacity 
            style={[styles.button, styles.rightButton]} onPress={handlePress}
          >
            <Text style={{ color: isDarkMode ? '#888888' : 'gray' }}>
              Filtros
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Botón filtros solo visible si selectedButton no es 'right' */}
      
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
          <TouchableOpacity style={styles.plusButton} onPress={handleAñadir}>
            <MaterialIcons name="add" size={44} color="white" />
          </TouchableOpacity>
        )}
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo claro para la pantalla
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para separar los botones
    padding: 10,
    paddingTop: 60,
    backgroundColor: '#f5f5f5', // Fondo claro para la barra superior
  },
  topComponent2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para separar los botones
    padding: 10,
    backgroundColor: '#f5f5f5', // Fondo claro para la barra superior}
  },
  topComponent3: {
    backgroundColor: '#f5f5f5', // Fondo claro para la barra superior}
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
    backgroundColor: '#121212', // Fondo oscuro para la pantalla
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para separar los botones
    padding: 10,
    paddingTop: 60,
    backgroundColor: '#1E1E1E', // Fondo oscuro para la barra superior
  },
  topComponent2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para separar los botones
    backgroundColor: '#1E1E1E', // Fondo oscuro para la barra superior
  },
  topComponent3: {
    backgroundColor: '#1E1E1E', // Fondo oscuro para la barra superior
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
    backgroundColor: '#BB86FC', // Color morado para el botón +
    borderRadius: 30,
  },
});
