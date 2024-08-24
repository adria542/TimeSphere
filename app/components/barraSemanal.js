import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDay, useTheme } from '../controllers/controladorContexto';

const DaySelector = () => {
  const { selectedDay, changeDay } = useDay();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  // Crear un array de fechas relativo a la fecha seleccionada
  const days = [
    new Date(selectedDay.getTime() - 2 * 86400000),
    new Date(selectedDay.getTime() - 1 * 86400000),
    selectedDay,
    new Date(selectedDay.getTime() + 1 * 86400000),
    new Date(selectedDay.getTime() + 2 * 86400000),
    new Date(selectedDay.getTime() + 3 * 86400000),
    new Date(selectedDay.getTime() + 4 * 86400000),
  ];

  const handleDayChange = (day) => {
    changeDay(day);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      {days.map((day, index) => (
        <TouchableOpacity key={index} onPress={() => handleDayChange(day)} style={styles.dayButton}>
          <Text style={[styles.dayText, (day) === (selectedDay) && styles.selectedDayText]}>
            {day.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const lightStyles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 5,
  },
  dayButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  selectedDayText: {
    color: '#007BFF',
    fontWeight: 'bold',
    backgroundColor: '#E6F0FF',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});

const darkStyles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 5,
  },
  dayButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#3A3A3A',
  },
  dayText: {
    fontSize: 14,
    color: '#bbb',
  },
  selectedDayText: {
    color: '#BB86FC',
    fontWeight: 'bold',
    backgroundColor: '#3E3A57',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});

export default DaySelector;
