import { useState, useCallback } from 'react';
import { useTheme } from '../controllers/controladorContexto'; // Asegúrate de que este hook esté correctamente implementado

export function useOpcionesController() {
  const { isDarkMode, toggleTheme } = useTheme(); // Hook para obtener el estado del tema y la función para alternar el tema

  // Estados para manejar los checkboxes
  const [vibracion, setVibracion] = useState(true);
  const [sonido, setSonido] = useState(true);

  // Maneja el toque en el checkbox de modo oscuro
  const handleModoOscuroChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return {
    vibracion,
    setVibracion,
    sonido,
    setSonido,
    isDarkMode,
    handleModoOscuroChange
  };
}
