import { db } from '../components/FireBase'; // Asegúrate de ajustar la ruta según la estructura de tu proyecto
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { Rutina } from './modeloRutina';

export class Actividad {
  constructor(id, nombre, tipo, imagen, duracion) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.imagen = imagen;
    this.duracion = duracion;
  }
}
