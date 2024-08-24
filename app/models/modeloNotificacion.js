import { db } from '../components/FireBase'; // Asegúrate de ajustar la ruta según la estructura de tu proyecto
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
}
