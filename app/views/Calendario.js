import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


export default function Calendario() {
  const navigation = useNavigation();

  const [selectedButton, setSelectedButton] = useState('left'); // Estado para seguir el botón seleccionado
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    navigation.navigate('views/Diario')
  };

  const handlePressOptions = () => {
    // Navega a la pantalla RutinaActiva
    navigation.navigate('views/Opciones');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handlePressOptions}>
        <MaterialIcons name="settings" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      <View style={styles.topComponent}>
        {/* Botón izquierdo */}
        <TouchableOpacity 
          style={[styles.button, styles.leftButton]} 
          onPress={() => setSelectedButton('left')}
        >
          <Text style={{ color: selectedButton === 'left' ? 'black' : 'gray' }}>
            Calendario
          </Text>
        </TouchableOpacity>

        {/* Botón derecho */}
        <TouchableOpacity 
          style={[styles.button, styles.rightButton]} 
          onPress={() => setSelectedButton('right')}
        >
          <Text style={{ color: selectedButton === 'right' ? 'black' : 'gray' }}>
            Diario
          </Text>
        </TouchableOpacity>
      </View>
       {/* Calendario */}
       <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        style={styles.calendar}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para separar los botones
    padding: 10,
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
});