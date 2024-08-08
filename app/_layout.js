import 'react-native-reanimated';
import Rutinas from './views/Rutinas';
import Calendario from './views/Calendario';
import Supermercados from './views/Supermercados';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <Tab.Navigator>
      {/* Definir cada pantalla como una pestaña */}
      <Tab.Screen name="views/Rutinas" component={Rutinas} />
      <Tab.Screen name="views/Calendario" component={Calendario} />
      <Tab.Screen name="views/Supermercados" component={Supermercados} />
    </Tab.Navigator>
  );
}
