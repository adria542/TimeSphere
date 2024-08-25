import { db } from '../components/FireBase';
import { doc, collection, getDocs } from 'firebase/firestore';

export class Supermercado {
  constructor(id, geoPoint, accesibilidad = [], nombre = '', ubicacion) {
    this.id = id;
    this.geoPoint = geoPoint; // Debería ser un objeto GeoPoint de Firebase
    this.accesibilidad = accesibilidad; // Una lista de strings
    this.nombre = nombre; // Nombre del supermercado
    this.ubicacion = ubicacion
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
          data.geoPoint, // Asume que data.geoPoint es un GeoPoint válido
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
}
