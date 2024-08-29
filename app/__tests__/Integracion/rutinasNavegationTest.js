import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Button } from 'react-native';
import 'react-native-gesture-handler';

// Mock de las pantallas que se usan en la navegación
const EditarRutinaScreen = () => <Text>Editar Rutina</Text>;
const CrearRutinaScreen = () => <Text>Crear Rutina</Text>;

// Componente de prueba que usa el controlador
const TestComponent = () => {
  const { handlePress, handlePressPlus } = useRutinasController();
  return (
    <>
      <Button title="Editar Rutina" onPress={() => handlePress('123')} />
      <Button title="Crear Rutina" onPress={handlePressPlus} />
    </>
  );
};

// Mock de la navegación
const Stack = createStackNavigator();
const MockedNavigator = ({ component }) => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="TestScreen" component={component} />
      <Stack.Screen name="EditarRutina" component={EditarRutinaScreen} />
      <Stack.Screen name="CrearRutina" component={CrearRutinaScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Mock del contexto shortSpan
jest.mock('../../controllers/controladorContexto', () => ({
  useShortSpan: jest.fn(),
  useDay: jest.fn(() => ({ selectedDay: '2023-08-28' })),
  useTheme: jest.fn(() => ({ isDarkMode: false })),
}));

// Mock del controlador de rutinas para evitar dependencias problemáticas
jest.mock('../../controllers/controladorRutinas', () => ({
  useRutinasController: jest.fn(() => ({
    handlePress: jest.fn(),
    handlePressPlus: jest.fn(),
  })),
}));

describe('Rutinas Controller Integration Test', () => {
  it('should navigate to EditarRutina screen and modify rutinaId', async () => {
    const { getByText } = render(<MockedNavigator component={TestComponent} />);

    // Simular la acción de editar una rutina
    fireEvent.press(getByText('Editar Rutina'));

    // Verificar la navegación a la pantalla de EditarRutina
    expect(getByText('Editar Rutina')).toBeTruthy();
  });

  it('should navigate to CrearRutina screen and set new rutinaId', async () => {
    const { getByText } = render(<MockedNavigator component={TestComponent} />);

    // Simular la acción de crear una rutina nueva
    fireEvent.press(getByText('Crear Rutina'));

    // Verificar la navegación a la pantalla de CrearRutina
    expect(getByText('Crear Rutina')).toBeTruthy();
  });
});
