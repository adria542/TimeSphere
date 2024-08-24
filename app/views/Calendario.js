import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../controllers/controladorContexto';
import { useDay } from '../controllers/controladorContexto';

export default function Calendario() {
  const { selectedDay, changeDay, changeDayDiario } = useDay();
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState('left');
  const [selectedDate, setSelectedDate] = useState('');
  const { isDarkMode } = useTheme();
  const isFocused = useIsFocused(); // Hook para saber si la pantalla está enfocada
  const [calendarKey, setCalendarKey] = useState(0); // Key para forzar el re-render

  // Manejar el evento de presionar un día en el calendario
  const onDayPress = (day) => {
    if (selectedButton === 'right') { // Si el botón seleccionado es "Diario"
      changeDayDiario(new Date(day.dateString))
      console.log(day.dateString)
      setSelectedDate(day.dateString);
      navigation.navigate('views/Diario');
    } else if (selectedButton === 'left') { // Si el botón seleccionado es "Calendario"
      changeDay(new Date(day.dateString));
      console.log(day.dateString)
      navigation.navigate('views/Rutinas');
      navigation.navigate('Rutinas');
    }
  };

  const handlePressOptions = () => {
    navigation.navigate('views/Opciones');
  };

  // Efecto para actualizar la key del calendario y forzar un re-render cuando cambia el modo
  useEffect(() => {
    setCalendarKey(prevKey => prevKey + 1);
  }, [isDarkMode]);
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handlePressOptions}>
          <MaterialIcons name="settings" size={24} color={isDarkMode ? "#BB86FC" : "blue"} />
        </TouchableOpacity>
      </View>
      <View style={styles.topComponent2}>
        <TouchableOpacity 
          style={[styles.button, styles.leftButton]} 
          onPress={() => setSelectedButton('left')}
        >
          <Text style={{ color: selectedButton === 'left' ? (isDarkMode ? '#BB86FC' : 'blue') : (isDarkMode ? '#888' : 'gray') }}>
            Calendario
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.rightButton]} 
          onPress={() => setSelectedButton('right')}
        >
          <Text style={{ color: selectedButton === 'right' ? (isDarkMode ? '#BB86FC' : 'blue') : (isDarkMode ? '#888' : 'gray') }}>
            Diario
          </Text>
        </TouchableOpacity>
      </View>
      <Calendar
        key={calendarKey} // Key para forzar el re-render
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: isDarkMode ? '#BB86FC' : 'blue',
          },
        }}
        style={styles.calendar}
        theme={isDarkMode ? blackCalendar : lightCalendar}
      />
    </View>
  );
}

const blackCalendar = {
  backgroundColor: '#121212',
  calendarBackground:'#121212',
  textSectionTitleColor:'#BB86FC',
  selectedDayBackgroundColor:'#BB86FC',
  selectedDayTextColor: '#ffffff',
  todayTextColor:'#03DAC6',
  dayTextColor:'#ffffff',
  textDisabledColor:'#666666',
  dotColor:'#BB86FC',
  selectedDotColor: '#ffffff',
  arrowColor:'#BB86FC',
  monthTextColor:'#BB86FC',
  indicatorColor:'#BB86FC',
};

const lightCalendar = {
  backgroundColor:  '#ffffff',
  calendarBackground:  '#ffffff',
  textSectionTitleColor:  '#000000',
  selectedDayBackgroundColor:  'blue',
  selectedDayTextColor: '#ffffff',
  todayTextColor:  '#00adf5',
  dayTextColor:  '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  arrowColor: 'black',
  monthTextColor: 'blue',
  indicatorColor: 'blue',
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 10,
    paddingTop: 60,
  },
  topComponent2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    width: '40%',
  },
  leftButton: {
    alignSelf: 'flex-start',
  },
  rightButton: {
    alignSelf: 'flex-end',
  },
  calendar: {
    borderRadius: 10,
    margin: 10,
    paddingBottom: 5,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    padding: 10,
    backgroundColor: '#1E1E1E',
  },
  topComponent2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    width: '40%',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  calendar: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    margin: 10,
    paddingBottom: 5,
  },
  calendarText: {
    color: '#FFFFFF',
  },
  selectedDay: {
    color: '#BB86FC',
  },
  todayText: {
    color: '#03DAC6',
  },
});
