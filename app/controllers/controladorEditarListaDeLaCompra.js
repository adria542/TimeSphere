import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Articulos } from '../models/modeloArticulos';
import { ListaCompra } from '../models/modeloListaCompra';
import { useShortSpan } from '../controllers/controladorContexto';

export function useEditarListaDeLaCompra() {
  const { changeLista, lista } = useShortSpan();
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nombreLista, setNombreLista] = useState('');
  const [articulosSeleccionados, setArticulosSeleccionados] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const articulosRecuperados = await Articulos.getTodosLosArticulos();
        setArticulos(articulosRecuperados);

        if (lista && lista.id) {
          const listaRecuperada = await ListaCompra.getListaById(lista.id);
          setNombreLista(listaRecuperada.nombre);

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
    const articulosParaGuardar = articulos.filter(articulo => articulosSeleccionados[articulo.id]);

    if (articulosParaGuardar.length === 0) {
      console.error('No se han seleccionado artículos.');
      return;
    }

    const nuevaLista = new ListaCompra(lista.id, nombreLista || 'nombre', articulosParaGuardar);

    try {
      await nuevaLista.save();
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

  return {
    articulos,
    loading,
    nombreLista,
    setNombreLista,
    articulosSeleccionados,
    toggleArticuloSeleccionado,
    handleBackPress,
    handleListoPress,
  };
}
