import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Supermercado from '../components/supermercados';
import Compra from '../components/compra';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, useShortSpan} from '../controllers/controladorContexto';
import { useSupermercadosController } from '../controllers/supermercadosController';
import { ListaCompra } from '../models/modeloListaCompra';

export default function Supermercados() {
  const [ubicacionInicial, setUbicacionInicial] = useState({latitude: 39.2855, longitude: 0.2128});
  const { lista, changeLista } = useShortSpan();
  const [selectedButton, setSelectedButton] = useState('left'); // Estado para seguir el botón seleccionado
  const { listasCompra, supermercados, loading, cargarDatos } = useSupermercadosController(ubicacionInicial);
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const handlePress = () => {
    // Navega a la pantalla Filtros
    navigation.navigate('views/Filtros');
  };

  const handleCompra = async (lista) => {
    // Navega a la pantalla ListasDeLaCompra
    await changeLista(lista);
    navigation.navigate('views/ListasDeLaCompra');
  };

  const handleAñadir = async () => {
    // Navega a la pantalla EditarListaDeLaCompra
    const lista = new ListaCompra('L'+ Date.now().toString(), 'nueva lista de la compra', [])
    await lista.save();
    await changeLista(lista);
    navigation.navigate('views/EditarListaDeLaCompra');
  };

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [cargarDatos])
  );

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('views/Opciones')}>
          <MaterialIcons name="settings" size={24} color={isDarkMode ? "#BB86FC" : "blue"} />
        </TouchableOpacity>
      </View>
      <View style={styles.topComponent2}>
        <TouchableOpacity 
          style={[styles.button, styles.leftButton]} 
          onPress={() => setSelectedButton('left')}
        >
          <Text style={{ color: selectedButton === 'left' ? (isDarkMode ? '#BB86FC' : 'blue') : (isDarkMode ? '#888888' : 'gray') }}>
            Supermercados
          </Text>
        </TouchableOpacity>
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
      
      <View style={styles.contenedorLista}>
        {loading ? (
          <ActivityIndicator size="large" color={isDarkMode ? "#BB86FC" : "blue"} />
        ) : (
          <ScrollView style={styles.lista}>
            {selectedButton === 'left' ? (
              supermercados.map((supermercado) => (
                <Supermercado
                  key={supermercado.id}
                  nombre={supermercado.nombre}
                  direccion={supermercado.ubicacion} // Aquí podrías ajustar cómo mostrar la dirección
                  etiquetas={supermercado.accesibilidad}
                />
              ))
            ) : (
              listasCompra.map((lista) => (
                <Compra
                  key={lista.id}
                  titulo={lista.nombre}
                  onPress={() => handleCompra(lista)} // Cambiado a una función de callback
                />
              ))
            )}
          </ScrollView>
        )}
      </View>
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
    backgroundColor: '#ffffff',
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 60,
    backgroundColor: '#f5f5f5',
  },
  topComponent2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  topComponent3: {
    backgroundColor: '#f5f5f5',
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
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 30,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 60,
    backgroundColor: '#1E1E1E',
  },
  topComponent2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
  },
  topComponent3: {
    backgroundColor: '#1E1E1E',
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
    alignSelf: 'flex-end',
    backgroundColor: '#BB86FC',
    borderRadius: 30,
  },
});
