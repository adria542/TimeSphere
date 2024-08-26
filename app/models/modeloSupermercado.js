import { db } from '../components/FireBase';
import { doc, collection, getDocs } from 'firebase/firestore';

export class Supermercado {
  constructor(id, geoPoint, accesibilidad = [], nombre = '', ubicacion) {
    this.id = id;
    this.geoPoint = geoPoint; // Debería ser un objeto GeoPoint de Firebase
    this.accesibilidad = accesibilidad; // Una lista de strings
    this.nombre = nombre; // Nombre del supermercado
    this.ubicacion = ubicacion;
  }

  // Método estático para recuperar todos los supermercados desde Firebase
  static async getTodosLosSupermercados() {
    try {
      // Referencia a la colección de supermercados
      const supermercadosCollectionRef = collection(db, 'TimeSphere', 'supermercado', 'supermercados');
      const supermercadosSnapshot = await getDocs(supermercadosCollectionRef);
      const supermercados = [];

      supermercadosSnapshot.forEach((doc) => {
        const data = doc.data();
        supermercados.push(new Supermercado(
          doc.id,
          data.geoPoint || {latitude: 0, longitude: 0},// Asume que data.geoPoint es un GeoPoint válido
          data.accesibilidad || [],
          data.nombre || '', // Asegúrate de que 'nombre' está incluido
          data.ubicacion || '',
        ));
      });
      return supermercados;
    } catch (error) {
      console.error('Error al recuperar los supermercados:', error);
      return [];
    }
  }

  // Método estático para calcular la distancia entre dos puntos geográficos (en kilómetros)
  static calcularDistancia(geoPoint1, geoPoint2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (geoPoint2.latitude - geoPoint1.latitude) * Math.PI / 180;
    const dLon = (geoPoint2.longitude - geoPoint1.longitude) * Math.PI / 180;
    const lat1 = geoPoint1.latitude * Math.PI / 180;
    const lat2 = geoPoint2.latitude * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; // Distancia en kilómetros
  }

  // Método estático para ordenar la lista de supermercados por distancia al geoPoint dado
  static ordenarSupermercadosPorDistancia(geoPoint, supermercados) {
    return supermercados.sort((a, b) => {
      const distanciaA = Supermercado.calcularDistancia(geoPoint, a.geoPoint);
      const distanciaB = Supermercado.calcularDistancia(geoPoint, b.geoPoint);
      return distanciaA - distanciaB;
    });
  }
}
