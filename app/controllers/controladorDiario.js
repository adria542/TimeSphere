// controladorDiario.js

import { useNavigation } from '@react-navigation/native';
import { useDay } from '../controllers/controladorContexto';
import { DiarioModelo } from '../models/modeloDiario';

export function useDiarioController() {
  const { diaDiario } = useDay();
  const navigation = useNavigation();

  const cargarDiario = async () => {
    if (diaDiario) {
      try {
        const diarios = await DiarioModelo.getDiarioPorDia(diaDiario);
        if (diarios.length > 0) {
          return diarios[0]; // Asumiendo que solo hay una entrada por día
        }
        console.log('No se encontró una entrada de diario para este día.');
        return null;
      } catch (error) {
        console.error('Error al cargar el diario:', error);
        return null;
      }
    }
    return null;
  };

  const guardarDiario = async (estadoEmocional, textoDiario) => {
    try {
      const entradaDiario = new DiarioModelo(
        'D' + Date.now().toString(), 
        estadoEmocional,
        textoDiario
      );
      await entradaDiario.GuardarDiario(diaDiario);
      console.log('Datos guardados', entradaDiario);
    } catch (error) {
      console.error('Error guardando el diario:', error);
    }
    navigation.navigate('_sitemap');
  };

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  return {
    cargarDiario,
    guardarDiario,
    handleBackPress,
  };
}
