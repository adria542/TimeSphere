import { db } from '../components/FireBase'; 
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { Rutina } from './rutina';

export class Notificacion {
  constructor(id, activa, sonido, vibracion, titulo) {
    this.id = id;
    this.activa = activa;
    this.sonido = sonido;
    this.vibracion = vibracion;
    this.titulo = titulo;
  }

  cambiarEstadoActiva () {
    this.activa = !this.activa
  }

  static handleSaveNotification = async (rutinaId, notificacionId, selectedDay) => {
    try {
      // Obtener la rutina correspondiente usando el ID
      const rutina = await Rutina.getRutinaPorId(rutinaId);
      
      if (rutina) {
        // Verificar si ya existe una notificación
        if (rutina.notificacion && rutina.notificacion.id === notificacionId) {
          // Actualizar la notificación existente
          rutina.notificacion = new Notificacion(
            notificacionId, // Usar el mismo ID para actualizar
            activa,
            sonido,
            vibracion,
            titulo
          );
          console.log(`Notificación actualizada: ${rutina.notificacion.id}`);
        } else {
          // Crear una nueva notificación
          const nuevaNotificacion = new Notificacion(
            'N' + Date.now().toString(),
            activa,
            sonido,
            vibracion,
            titulo
          );
          
          rutina.notificacion = nuevaNotificacion;
          console.log(`Nueva notificación creada: ${nuevaNotificacion.id}`);
        }
  
        // Guardar la rutina con la notificación actualizada o nueva
        await rutina.save(selectedDay);
      }
    } catch (error) {
      console.error('Error al guardar la notificación:', error);
    }
  };  
}
