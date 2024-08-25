import { db } from '../components/FireBase';
import { doc, collection, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { Articulos } from './modeloArticulos'; // Importa el modelo Articulos para manejar la colección de artículos

export class ListaCompra {
  constructor(id, nombre, articulos = []) {
    this.id = id;
    this.nombre = nombre;
    this.articulos = articulos; // Se espera que sea un array de objetos Articulos
  }

  // Método estático para recuperar una lista de la compra por ID
  static async getListaById(id) {
    try {
      const listaRef = doc(db, 'TimeSphere', 'supermercado', 'listaDeLaCompra', id);
      const listaSnapshot = await getDoc(listaRef);
  
      if (!listaSnapshot.exists()) {
        console.log('Lista no encontrada');
        return null;
      }
  
      const data = listaSnapshot.data();
      console.log('Datos de la lista:', data);
  
      const articulos = Array.isArray(data.articulos) ? await Promise.all(
        data.articulos.map(async (articuloId) => {
          const articuloRef = doc(db, 'TimeSphere', 'supermercado', 'articulos', articuloId);
          const articuloSnapshot = await getDoc(articuloRef);
          console.log('Data de Artículo:', articuloSnapshot.data());
          if (articuloSnapshot.exists()) {
            return new Articulos(
              articuloSnapshot.id,
              articuloSnapshot.data().nombre,
              articuloSnapshot.data().imagen
            );
          }
          return null;
        })
      ) : [];
      const retur = new ListaCompra(
        id,
        data.nombre,
        articulos,
      );
      console.log('Artículos:', articulos[0].nombre + 'resulta en :' + retur);
  
      return retur;
    } catch (error) {
      console.error('Error al recuperar la lista de la compra por ID:', error);
      return null;
    }
  }
  
  
  // Método estático para recuperar todas las listas de la compra desde Firebase
  static async getTodasLasListasDeCompra() {
    try {
      const listasCollectionRef = collection(db, 'TimeSphere', 'supermercado', 'listaDeLaCompra');
      const listasSnapshot = await getDocs(listasCollectionRef);
      const listasDeCompra = [];
  
      for (const docSnapshot of listasSnapshot.docs) {
        const data = docSnapshot.data();
  
        // Verifica que 'articulos' es un array
        const articulos = Array.isArray(data.articulos) ? await Promise.all(
          data.articulos.map(async (articuloId) => {
            const articuloRef = doc(db, 'TimeSphere', 'supermercado', 'articulos', articuloId);
            const articuloSnapshot = await getDoc(articuloRef);
            if (articuloSnapshot.exists()) {
              return new Articulos(
                articuloSnapshot.id,
                articuloSnapshot.data().nombre,
                articuloSnapshot.data().imagen
              );
            }
            return null; // Maneja el caso en que el artículo no existe
          })
        ) : []; // Si 'articulos' no es un array, usa un array vacío
  
        listasDeCompra.push(new ListaCompra(
          docSnapshot.id,
          data.nombre,
          articulos.filter(articulo => articulo !== null) // Filtra los artículos no encontrados
        ));
      }
  
      return listasDeCompra;
    } catch (error) {
      console.error('Error al recuperar las listas de la compra:', error);
      return [];
    }
  }

  // Método para guardar una lista de la compra en Firebase
  async save() {
    try {
      const listaRef = doc(db, 'TimeSphere', 'supermercado', 'listaDeLaCompra', this.id);
      await setDoc(listaRef, {
        nombre: this.nombre,
        articulos: this.articulos.map(articulo => articulo.id) // Guarda solo los IDs de los artículos
      });
    } catch (error) {
      console.error('Error al guardar la lista de la compra:', error);
    }
  }
}
