import { useState, useEffect, useCallback } from 'react';
import { ListaCompra } from '../models/modeloListaCompra';
import { useShortSpan } from '../controllers/controladorContexto';

export function useListasDeLaCompraController() {
  const { lista } = useShortSpan();
  const [titulo, setTitulo] = useState("Lista de la compra")
  const [articulos, setArticulos] = useState([]);
  const [seleccionados, setSeleccionados] = useState(new Set());

  // Cargar los artículos de la lista de compra cuando la lista cambie
  useEffect(() => {
    if (lista) {
      console.log(lista);
      setArticulos(lista.articulos || []);
      setTitulo(lista.nombre || "lista de la compra")
      // Restaurar el estado de los artículos seleccionados si es necesario
    } else {
      setArticulos([]);
    }
  }, [lista]);

  // Función para alternar la selección de un artículo
  const toggleArticulo = (id) => {
    setSeleccionados(prevSeleccionados => {
      const nuevoSeleccionados = new Set(prevSeleccionados);
      if (nuevoSeleccionados.has(id)) {
        nuevoSeleccionados.delete(id);
      } else {
        nuevoSeleccionados.add(id);
      }
      return nuevoSeleccionados;
    });
  };

  return {
    articulos,
    seleccionados,
    titulo,
    toggleArticulo
  };
}
