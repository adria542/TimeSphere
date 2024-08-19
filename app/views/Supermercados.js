import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import Supermercado from '../components/supermercados';
import Compra from '../components/compra';

export default function Supermercados() {
  const [selectedButton, setSelectedButton] = useState('left'); // Estado para seguir el botón seleccionado

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
        <Button title="" onPress={() => alert('Botón presionado')} />
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
            style={[styles.button, styles.rightButton]}
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
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
