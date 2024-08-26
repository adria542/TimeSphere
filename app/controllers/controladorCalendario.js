// controladorCalendario.js

import { useNavigation } from '@react-navigation/native';
import { useDay } from './controladorContexto';

export function useCalendarioController() {
  const navigation = useNavigation();
  const { changeDay, changeDayDiario } = useDay();

  const handleDayPress = (day, selectedButton) => {
    const selectedDate = new Date(day.dateString);
    
    if (selectedButton === 'right') {
      changeDayDiario(selectedDate);
      navigation.navigate('views/Diario');
    } else if (selectedButton === 'left') {
      changeDay(selectedDate);
      navigation.navigate('Rutinas');
    }
  };

  const handlePressOptions = () => {
    navigation.navigate('views/Opciones');
  };

  return {
    handleDayPress,
    handlePressOptions,
  };
}
