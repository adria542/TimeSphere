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

const RutinaContext = createContext();

export const RutinaProvider = ({ children }) => {
  const [actividadId, setActividadId]= useState(false);
  const [editandoActividad, setEditandoActividad]= useState(false);
  const [rutinaId, setRutinaId] = useState(null); // Por defecto, el día actual
  const [notificacion, setNotificacion] = useState(null)
  const [lista, setLista] = useState(null)

  const changeRutina = (rutinaId) => {
    setRutinaId(rutinaId);
  };
  const changeNotificacion = (notificacion) => {
    setNotificacion(notificacion);
  };
  const changeStateTrue = () => {
    setEditandoActividad(true);
  };
  const changeStateFalse = () => {
    setEditandoActividad(false);
  };
  const changeActividad = (actividadId) => {
    setActividadId(actividadId);
  };
  const changeLista = (Lista) => {
    setLista(Lista);
  };
  return (
    <RutinaContext.Provider value={{ rutinaId, editandoActividad, actividadId, notificacion, lista, changeLista, changeNotificacion, changeActividad, changeStateTrue, changeStateFalse, changeRutina}}>
      {children}
    </RutinaContext.Provider>
  );
};

export const useRutinaId = () => useContext(RutinaContext);
export const useDay = () => useContext(DayContext);
export const useTheme = () => useContext(ThemeContext);
