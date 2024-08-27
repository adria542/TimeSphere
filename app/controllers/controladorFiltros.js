// hooks/useFiltros.js

import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useShortSpan } from './controladorContexto';

export function useFiltros() {
  const navigation = useNavigation();
  const { filtros, changeFiltros } = useShortSpan(); // Obtener filtros del contexto
  const [checkedItems, setCheckedItems] = useState({});

  // Tipos de accesibilidad
  const accesibilidad = [
    { id: 1, titulo: 'Rampas' },
    { id: 2, titulo: 'Baños adaptados' },
    { id: 3, titulo: 'Pasillos amplios' },
    { id: 4, titulo: 'Señalización Braille' },
    { id: 5, titulo: 'musica reducida' },
  ];

  // Inicializar checkedItems con los filtros actuales
  useEffect(() => {
    const filtrosIniciales = accesibilidad.reduce((acc, item) => {
      if (filtros.includes(item.titulo)) {
        acc[item.id] = true;
      }
      return acc;
    }, {});
    setCheckedItems(filtrosIniciales);
  }, [filtros]);

  // Maneja el toque en el botón "Volver"
  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  // Maneja el cambio en el checkbox
  const handleCheckboxChange = (id) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [id]: !checkedItems[id], // Cambia el estado actual del checkbox
    };
    setCheckedItems(updatedCheckedItems);

    // Actualiza el contexto de filtros
    const nuevosFiltros = Object.keys(updatedCheckedItems)
      .filter(key => updatedCheckedItems[key])
      .map(key => accesibilidad.find(item => item.id === parseInt(key)).titulo);
      
    changeFiltros(nuevosFiltros);
  };

  return {
    checkedItems,
    handleCheckboxChange,
    handleBackPress,
    accesibilidad,
  };
}
