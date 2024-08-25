import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Articulo from '../components/articulo'; // Ajusta la ruta según tu estructura de archivos
import { useTheme, useRutinaId } from '../controllers/controladorContexto';
import { Articulos } from '../models/modeloArticulos'; // Importa la clase Articulos del modelo
import { ListaCompra } from '../models/modeloListaCompra'; // Importa la clase ListaCompra del modelo

export default function EditarListaDeLaCompra() {
  const {changeLista, lista} = useRutinaId();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const [articulos, setArticulos] = useState([]); // Estado para almacenar los artículos
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga
  const [nombreLista, setNombreLista] = useState(''); // Estado para el nombre de la lista de la compra
  const [articulosSeleccionados, setArticulosSeleccionados] = useState({}); // Estado para los artículos seleccionados

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar artículos
        const articulosRecuperados = await Articulos.getTodosLosArticulos();
        setArticulos(articulosRecuperados);

        // Cargar la lista de la compra
        if (lista && lista.id) {
          const listaRecuperada = await ListaCompra.getListaById(lista.id);
          setNombreLista(listaRecuperada.nombre);

          // Configurar los artículos seleccionados basados en la lista
          const articulosSeleccionadosMap = listaRecuperada.articulos.reduce((acc, articulo) => {
            acc[articulo.id] = true;
            return acc;
          }, {});
          setArticulosSeleccionados(articulosSeleccionadosMap);
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [lista]);

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  const handleListoPress = async () => {
    // Debugging: Check the current state
    console.log('Artículos seleccionados:', articulosSeleccionados);
    console.log('Todos los artículos:', articulos);

    // Filtrar los artículos seleccionados
    const articulosParaGuardar = articulos.filter(articulo => articulosSeleccionados[articulo.id]);
    
    // Debugging: Check the filtered list
    console.log('Artículos para guardar:', articulosParaGuardar);

    // Verificar si la lista de artículos a guardar está vacía
    if (articulosParaGuardar.length === 0) {
      console.error('No se han seleccionado artículos.');
      return;
    }
    const nuevaLista = new ListaCompra(lista.id, nombreLista, articulosParaGuardar);
    if (!nuevaLista.nombre) {
      nuevaLista.nombre = 'nombre';
    }
    // Verificar los valores antes de guardar
    if (nuevaLista.articulos.length > 0) {
      console.log(`Guardando la lista: ${nuevaLista.nombre} con artículos: ${nuevaLista.articulos.map(a => a.nombre).join(', ')}`);
    }

    try {
      console.log('antes de guardar:' + nuevaLista.nombre)
      await nuevaLista.save();
      console.log('Lista de la compra guardada con éxito');
      changeLista(nuevaLista);
      navigation.navigate('views/ListasDeLaCompra');
    } catch (error) {
      console.error('Error al guardar la lista de la compra:', error);
    }
  };

  const toggleArticuloSeleccionado = (id) => {
    setArticulosSeleccionados(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Crear Lista de la Compra</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la lista"
        placeholderTextColor={isDarkMode ? "#BB86FC" : "#999"}
        value={nombreLista}
        onChangeText={setNombreLista}
      />
      <ScrollView style={styles.articulosContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={isDarkMode ? "#BB86FC" : "#0000ff"} />
        ) : (
          articulos.map((articulo) => (
            <Articulo
              key={articulo.id}
              imageSource={{ uri: articulo.imagen }} // Usa la URL de la imagen recuperada
              nombreArticulo={articulo.nombre}
              checked={articulosSeleccionados[articulo.id] || false}
              onToggle={() => toggleArticuloSeleccionado(articulo.id)}
            />
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.botonListo} onPress={handleListoPress}>
        <Text style={styles.botonListoText}>Guardar Lista</Text>
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
    left: 10,
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000',
  },
  articulosContainer: {
    flex: 1,
  },
  botonListo: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonListoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    left: 10,
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
    justifyContent: 'space-between',
    backgroundColor: '#121212',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#E0E0E0',
  },
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#E0E0E0',
    backgroundColor: '#1e1e1e',
  },
  articulosContainer: {
    flex: 1,
  },
  botonListo: {
    backgroundColor: '#03DAC6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonListoText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '600',
  },
});
