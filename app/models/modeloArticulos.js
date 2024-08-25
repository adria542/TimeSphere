import { db } from '../components/FireBase'; // Asegúrate de que la referencia a Firestore está configurada
import { doc, collection, getDocs, getDoc } from 'firebase/firestore';

export class Articulos {
  constructor(id, nombre, imagen) {
    this.id = id;          // ID del artículo
    this.nombre = nombre;  // Nombre del artículo
    this.imagen = imagen;  // URL de la imagen del artículo en formato string
  }

  // Método estático para recuperar todos los artículos desde Firebase
  static async getTodosLosArticulos() {
    try {
      // Referencia a la colección de artículos en Firebase
      const articulosCollectionRef = collection(db, 'TimeSphere', 'supermercado', 'articulos');
      const articulosSnapshot = await getDocs(articulosCollectionRef);
      const articulos = [];

      // Recorrer todos los documentos en la colección y crear objetos Articulos
      articulosSnapshot.forEach((doc) => {
        const data = doc.data();
        articulos.push(new Articulos(
          doc.id,
          data.nombre || '',  // Asegúrate de que 'nombre' está incluido en los datos
          data.imagen || '',  // Asegúrate de que 'imagen' está incluido en los datos
        ));
      });

      return articulos;
    } catch (error) {
      console.error('Error al recuperar los artículos:', error);
      return [];
    }
  }

  static async obtenerArticuloPorId(id) {
    try {
      const articuloRef = doc(db, 'TimeSphere', 'supermercado', 'articulos', id);
      const docSnap = await getDoc(articuloRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        return new Articulos(id, data.nombre || '', data.imagen || '');
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el artículo:', error);
      throw error;
    }
  }
  
}
