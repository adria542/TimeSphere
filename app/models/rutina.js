import { db } from '../components/FireBase'; 
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

export class Rutina {
  constructor(id, actividades = [], notificacion = {}, hora = '', imagen = '', titulo = '') {
    this.id = id;
    this.actividades = actividades;
    this.notificacion = notificacion;
    this.hora = hora;
    this.titulo = titulo;
    this.imagen = imagen;
  }

  // Formatea la fecha a 'yyyy-mm-dd'
  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Recupera rutinas para un día específico
  static async getRutinasPorDia(date) {
    const formattedDate = Rutina.formatDate(date);
    const rutinasCollectionRef = collection(db, `TimeSphere/${formattedDate}/rutinas`);
    const rutinasSnapshot = await getDocs(rutinasCollectionRef);
    const rutinas = [];
    
    if (!rutinasSnapshot.empty) {
      rutinasSnapshot.docs.forEach(doc => {
        const data = doc.data();
        rutinas.push(new Rutina(
          doc.id,
          data.actividades || [],
          data.notificacion || {},
          data.hora || '',
          data.imagen || '',
          data.titulo || ''
        ));
      });
    } else {
      console.log('No hay rutinas en la colección.');
    }
    
    return rutinas;
  }

  // Recupera una rutina por su ID sin necesidad de pasar el día
  static async getRutinaPorId(id) {
    const timeSphereRef = collection(db, 'TimeSphere');
    const dateDocs = await getDocs(timeSphereRef);
  
    for (const dateDoc of dateDocs.docs) {
  
      const rutinasRef = collection(db, `TimeSphere/${dateDoc.id}/rutinas`);
      const rutinaDocs = await getDocs(rutinasRef);
  
      rutinaDocs.forEach(doc => {
      });
  
      for (const rutinaDoc of rutinaDocs.docs) {
        if (rutinaDoc.id === id) {
          const data = rutinaDoc.data();
          console.log(`Rutina encontrada: ${rutinaDoc.id}`);
          return new Rutina(
            rutinaDoc.id,
            data.actividades || [],
            data.notificacion || {},
            data.hora || '',
            data.imagen || '',
            data.titulo || ''
          );
        }
      }
    }
  
    console.log('No se encontró la rutina con el ID proporcionado en ningún día.');
    return null;
  }
  

  // Método para convertir una instancia de Notificacion en un objeto plano
  static notificacionToPlainObject(notificacion) {
    return {
      id: notificacion.id,
      activa: notificacion.activa,
      sonido: notificacion.sonido,
      vibracion: notificacion.vibracion,
      titulo: notificacion.titulo,
    };
  }

  // Método para convertir una instancia de Actividad en un objeto plano
  static actividadToPlainObject(actividad) {
    return {
      id: actividad.id,
      nombre: actividad.nombre,
      tipo: actividad.tipo,
      imagen: actividad.imagen,
      duracion: actividad.duracion,
    };
  }

  // Guarda una rutina con sus actividades y notificaciones como campos
  async save(dia) {
    const formattedDate = Rutina.formatDate(dia);
    const dateDocRef = doc(db, `TimeSphere/${formattedDate}`);
    
    // Verificar si el documento del día existe
    const dateDocSnap = await getDoc(dateDocRef);
  
    if (!dateDocSnap.exists()) {
      // Si el documento del día no existe, crearlo con un objeto vacío o con algún dato inicial
      try {
        await setDoc(dateDocRef, {}); // Puedes agregar datos iniciales si es necesario
      } catch (error) {
        console.error(`Error al crear el documento para el día ${formattedDate}:`, error);
        return;
      }
    } else {
      console.log(`Documento para el día ${formattedDate} ya existe.`);
    }
  
    // Ahora guardar la rutina en la subcolección 'rutinas'
    const rutinaRef = doc(db, `TimeSphere/${formattedDate}/rutinas`, this.id);
  
    // Convertir actividades y notificación a objetos planos
    const actividadesPlanas = this.actividades.map(actividad => Rutina.actividadToPlainObject(actividad));
    const notificacionPlana = Rutina.notificacionToPlainObject(this.notificacion);
  
    try {
      await setDoc(rutinaRef, {
        hora: this.hora,
        titulo: this.titulo,
        imagen: this.imagen,
        actividades: actividadesPlanas,
        notificacion: notificacionPlana
      });
      console.log(`Rutina guardada en TimeSphere/${formattedDate}/rutinas con ID: ${this.id}`);
    } catch (error) {
      console.error(`Error al guardar la rutina con ID ${this.id}:`, error);
    }
  }
  
}
