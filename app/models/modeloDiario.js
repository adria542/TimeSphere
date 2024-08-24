import { db } from '../components/FireBase'; 
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

export class DiarioModelo {
  constructor(id, estadoEmocional, entradaDiario) {
    this.id = id;
    this.estadoEmocional = estadoEmocional;
    this.entradaDiario = entradaDiario;
  }

  // Función para obtener los diarios por fecha específica
  static async getDiarioPorDia(date) {
    const formattedDate = DiarioModelo.formatDate(date);
    const diarioCollectionRef = collection(db, `TimeSphere/${formattedDate}/diario`);
    const diarioSnapshot = await getDocs(diarioCollectionRef);
    const diarios = [];

    if (!diarioSnapshot.empty) {
      diarioSnapshot.docs.forEach(doc => {
        const data = doc.data();
        diarios.push(new DiarioModelo(
          doc.id,
          data.estadoEmocional || 0,  // Usamos 0 como valor por defecto si no se encuentra un estado emocional
          data.entradaDiario || ''   // Usamos una cadena vacía si no se encuentra una entrada de diario
        ));
      });
    } else {
      console.log('No hay diarios en la colección.');
    }
    
    return diarios;
  }

  // Formatea la fecha a 'yyyy-mm-dd'
  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Función para guardar un diario
  async GuardarDiario (dia) {
    const formattedDate = DiarioModelo.formatDate(dia);
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

    // Ahora guardar el diario en la subcolección 'diario'
    const diarioRef = doc(db, `TimeSphere/${formattedDate}/diario`, this.id);
    try {
      await setDoc(diarioRef, {
        estadoEmocional: this.estadoEmocional,
        entradaDiario: this.entradaDiario,
      });
      console.log(`Diario guardado en TimeSphere/${formattedDate}/diario con ID: ${this.id}`);
    } catch (error) {
      console.error(`Error al guardar el diario con ID ${this.id}:`, error);
    }
  }
}
