import { View, Text, Button, FlatList, ScrollView, StyleSheet, Alert} from 'react-native';
import Rutina from '../components/rutinas';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function Rutinas() {
  const handlePress = (titulo) => {
    Alert.alert(`Has pulsado la rutina: ${titulo}`);
  };

  return (
    <View style={styles.container}>
    {/* Primer componente: Botón + Grid */}
    <View style={styles.topComponent}>
      <Button title="" onPress={() => alert('Botón presionado')} />
      <FlatList
        data={daysOfWeek}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.dayItem}>{item}</Text>}
        style={styles.grid}
      />
    </View>

      {/* Segundo componente: Scroll List */}
      <ScrollView style={{ flex: 1 }}>
        <Rutina titulo="Hacer ejercicio" hora="07:00 AM" imagen="https://example.com/imagen1.jpg" onPress={() => handlePress("Hacer ejercicio")} />
        <Rutina titulo="Desayuno" hora="08:00 AM" imagen="https://example.com/imagen2.jpg" onPress={() => handlePress("Desayuno")} />
        <Rutina titulo="Reunión de trabajo" hora="09:00 AM" imagen="https://example.com/imagen3.jpg" onPress={() => handlePress("Reunión de trabajo")} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  grid: {
    marginLeft: 3,
    borderWidth: 2,
  },
  dayItem: {
    marginHorizontal: 5,
    fontSize: 14,
  },
  scrollList: {
    flex: 1,
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
