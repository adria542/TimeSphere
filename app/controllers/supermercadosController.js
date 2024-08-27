// controllers/supermercadosController.js

import { useState, useCallback, useEffect } from 'react';
import { Supermercado as SupermercadoModel } from '../models/modeloSupermercado';
import { ListaCompra } from '../models/modeloListaCompra';
import { useShortSpan } from './controladorContexto';

export function useSupermercadosController(ubicacionInicial) {
  const [listasCompra, setListasCompra] = useState([]);
  const [supermercados, setSupermercados] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filtros } = useShortSpan(); // Obtener filtros del contexto

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const listasRecuperadas = await ListaCompra.getTodasLasListasDeCompra();
      setListasCompra(listasRecuperadas);

      const supermercadosRecuperados = await SupermercadoModel.getTodosLosSupermercados();
      const supermercadosRecuperadosOrdenados = await SupermercadoModel.ordenarSupermercadosPorDistancia(ubicacionInicial, supermercadosRecuperados);

      // Filtrar supermercados basados en los filtros
      const supermercadosFiltrados = supermercadosRecuperadosOrdenados.filter(supermercado => {
        if (filtros.length === 0) return true; // Si no hay filtros, mostrar todos los supermercados
        return supermercado.accesibilidad.some(accesibilidad => filtros.includes(accesibilidad));
      });

      setSupermercados(supermercadosFiltrados);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setLoading(false);
    }
  }, [ubicacionInicial, filtros]);

  useEffect(() => {
    cargarDatos(); // Cargar datos cada vez que cambien los filtros o la ubicación
  }, [cargarDatos]);

  return {
    listasCompra,
    supermercados,
    loading,
    cargarDatos
  };
}
