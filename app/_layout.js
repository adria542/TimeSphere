// layout.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import Rutinas from './views/Rutinas';
import Calendario from './views/Calendario';
import Supermercados from './views/Supermercados';
import Diario from './views/Diario';
import Filtros from './views/Filtros';
import Opciones from './views/Opciones';
import RutinaActiva from './views/rutinaActiva';
import ListasDeLaCompra from './views/ListasDeLaCompra';
import CrearRutina from './views/CrearRutina';
import EditarRutina from './views/EditarRutina';
import EditarActividad from './views/EditarActividad';
import EditarNotificacion from './views/EditarNotificacion';
import EditarListaDeLaCompra from './views/EditarListaDeLaCompra';
import { ThemeProvider, useTheme } from './controllers/controladorContexto'; // Asegúrate de que la ruta es correcta
import { DayProvider } from './controllers/controladorContexto';
import { RutinaProvider } from './controllers/controladorContexto';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Rutinas') iconName = 'fitness-center';
          else if (route.name === 'Calendario') iconName = 'calendar-today';
          else if (route.name === 'Supermercados') iconName = 'store';

          return <MaterialIcons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: isDarkMode ? '#BB86FC' : 'blue',
        tabBarInactiveTintColor: isDarkMode ? '#FFFFFF' : '#222222',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#1F1F1F' : '#E0E0E0',
        },
      })}
    >
      <Tab.Screen name="Rutinas" component={Rutinas} />
      <Tab.Screen name="Calendario" component={Calendario} />
      <Tab.Screen name="Supermercados" component={Supermercados} />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  return (
    <DayProvider>
      <ThemeProvider>
        <RutinaProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="_sitemap" component={TabNavigator} />
            <Stack.Screen name="views/rutinaActiva" component={RutinaActiva} />
            <Stack.Screen name="views/Rutinas" component={Rutinas} />
            <Stack.Screen name="views/Calendario" component={Calendario} />
            <Stack.Screen name="views/Diario" component={Diario} />
            <Stack.Screen name="views/Filtros" component={Filtros} />
            <Stack.Screen name="views/Supermercados" component={Supermercados} />
            <Stack.Screen name="views/Opciones" component={Opciones} />
            <Stack.Screen name="views/ListasDeLaCompra" component={ListasDeLaCompra} />
            <Stack.Screen name="views/CrearRutina" component={CrearRutina} />
            <Stack.Screen name="views/EditarRutina" component={EditarRutina} />
            <Stack.Screen name="views/EditarActividad" component={EditarActividad} />
            <Stack.Screen name="views/EditarNotificacion" component={EditarNotificacion} />
            <Stack.Screen name="views/EditarListaDeLaCompra" component={EditarListaDeLaCompra} />
          </Stack.Navigator>
        </RutinaProvider>
      </ThemeProvider>
    </DayProvider>
  );
}
