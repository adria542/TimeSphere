import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, useRutinaId } from '../controllers/controladorContexto';
import { Rutina } from '../models/rutina';
import { MaterialIcons } from '@expo/vector-icons';
import ContadorDescendente from '../components/contador';

const RutinaActiva = () => {
  const { rutinaId } = useRutinaId();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;
  const [actividad, setActividad] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchRutina = async () => {
      const rutinaData = await Rutina.getRutinaPorId(rutinaId);
      if (rutinaData) {
        setRutina(rutinaData);
        if (rutinaData.actividades.length > 0) {
          setActividad(rutinaData.actividades[0]);
        }
      }
    };
    fetchRutina();
  }, [rutinaId]);

  useEffect(() => {
    if (rutina && rutina.actividades.length > 0) {
      setActividad(rutina.actividades[currentActivityIndex]);
    }
  }, [currentActivityIndex, rutina]);

  const handleBackPress = () => {
    navigation.navigate('_sitemap');
  };

  const handlePlayPress = () => {
    setIsPlaying(true);
    console.log('Reproducir actividad');
  };

  const handlePausePress = () => {
    setIsPlaying(false);
    console.log('Pausar actividad');
  };

  const handleSkipPress = async () => {
    if (rutina && rutina.actividades.length > 0) {
      const nextIndex = (currentActivityIndex + 1) % rutina.actividades.length;
      if (nextIndex === 0) {
        navigation.navigate('_sitemap');
      } else {
        setCurrentActivityIndex(nextIndex);
        setActividad(rutina.actividades[nextIndex]);
      }
      setIsPlaying(false); // Detiene el contador al saltar a la siguiente actividad
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{actividad?.nombre || 'Cargando...'}</Text>
      </View>

      {actividad ? (
        <>
          <Image 
            source={{ uri: actividad.imagen }} // Usa la imagen de la actividad
            style={styles.image}
          />
          <ContadorDescendente
            duracion={actividad.duracion * 60}
            isPlaying={isPlaying}
            index = {currentActivityIndex}
            onFinish={handleSkipPress}
          />
        </>
      ) : (
        <Text style={styles.loading}>Cargando...</Text>
      )}

      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handlePausePress}>
          <MaterialIcons name="pause" size={50} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handlePlayPress}>
          <MaterialIcons name="play-arrow" size={50} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleSkipPress}>
          <MaterialIcons name="skip-next" size={50} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  iconButton: {
    padding: 10,
  },
  loading: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  backButtonText: {
    color: '#BB86FC',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  iconButton: {
    padding: 10,
  },
  loading: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RutinaActiva;
