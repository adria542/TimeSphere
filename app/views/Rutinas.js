import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Rutina from '../components/rutinas';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const daysOfWeek = ['1 LUN', '2 MAR', '3 MIE', '4 JUE', '5 VIE', '6 SAB', '7 DOM'];

export default function Rutinas() {
  const navigation = useNavigation();

  const handlePress = (titulo) => {
    navigation.navigate('views/rutinaActiva');
  };

  const handlePressOptions = () => {
    navigation.navigate('views/Opciones');
  };

  return (
    <View style={styles.container}>
      {/* Primer componente: Botón + Grid */}
      <View style={styles.topComponent}>
        <TouchableOpacity style={styles.backButton} onPress={handlePressOptions}>
          <MaterialIcons name="settings" size={24} color="blue" />
        </TouchableOpacity>
        <FlatList
          data={daysOfWeek}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <Text style={[styles.dayItem, index !== daysOfWeek.length - 1 && styles.dayItemBorder]}>
              {item}
            </Text>
          )}
          style={styles.grid}
          contentContainerStyle={styles.gridContentContainer} // Agrega los estilos de disposición aquí
        />
      </View>

      {/* Segundo componente: Scroll List */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContentContainer}>
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
    marginTop: 60,
  },
  topComponent: {
    flexDirection: 'row',
    padding: 10,
  },
  grid: {
    flexGrow: 0, // Ajusta el tamaño del grid al contenido
    borderWidth: 2,
  },
  gridContentContainer: {
    justifyContent: 'center', // Mueve aquí el estilo de disposición
  },
  dayItem: {
    fontSize: 13,
    paddingHorizontal: 7.5,
    paddingVertical: 5,
    textAlign: 'center',
  },
  dayItemBorder: {
    borderRightWidth: 1,
  },
  scrollContentContainer: {
    flexGrow: 1, // Asegura que el ScrollView se expanda correctamente
  },
});
