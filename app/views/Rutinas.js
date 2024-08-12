import { View, Text, Button, FlatList, ScrollView, StyleSheet, Dimensions } from 'react-native';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function Rutinas() {
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
      <ScrollView style={styles.scrollList}>
        {/* Aquí puedes renderizar los elementos de la lista */}
        {[...Array(20)].map((_, index) => (
          <View key={index} style={styles.listItem}>
            <Text>Elemento {index + 1}</Text>
          </View>
        ))}
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
