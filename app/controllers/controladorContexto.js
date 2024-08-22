// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(null);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const DayContext = createContext();

export const DayProvider = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState(new Date()); // Por defecto, el día actual
  const [diaDiario, setDiaDiario] = useState(new Date()); // Por defecto, el día actual

  const changeDay = (newDay) => {
    setSelectedDay(newDay);
  };
  const changeDayDiario = (newDay) => {
    setDiaDiario(newDay);
  };

  return (
    <DayContext.Provider value={{ selectedDay, diaDiario, changeDayDiario, changeDay }}>
      {children}
    </DayContext.Provider>
  );
};

export const useDay = () => useContext(DayContext);
export const useTheme = () => useContext(ThemeContext);
