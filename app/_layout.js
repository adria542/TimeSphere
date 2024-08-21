import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener instalada esta biblioteca
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Rutinas"
        component={Rutinas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fitness-center" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={Calendario}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Supermercados"
        component={Supermercados}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="store" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="_sitemap" component={TabNavigator} />
      <Stack.Screen name="views/rutinaActiva" component={RutinaActiva} />
      <Stack.Screen name="views/Rutinas" component={Rutinas} />
      <Stack.Screen name="views/Caledario" component={Calendario} />
      <Stack.Screen name="views/Diario" component={Diario} />
      <Stack.Screen name="views/Filtros" component={Filtros} />
      <Stack.Screen name="views/Supermercados" component={Supermercados} />
      <Stack.Screen name="views/Opciones" component={Opciones} />
      <Stack.Screen name="views/ListasDeLaCompra" component={ListasDeLaCompra} />
      <Stack.Screen name="views/CrearRutina" component={CrearRutina} />
      <Stack.Screen name="views/EditarRutina" component={EditarRutina} />
      <Stack.Screen name="views/EditarActividad" component={EditarActividad} />
      <Stack.Screen name="views/EditarNotificacion" component={EditarNotificacion} />
    </Stack.Navigator>
  );
}
