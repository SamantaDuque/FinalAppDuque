import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapPreview from './MapPreview';

export default function LocationSelector({ onLocationPicked }) {
  const [pickedLocation, setPickedLocation] = useState(null);

  const getLocationHandler = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos tu ubicación para continuar.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({ timeout: 5000 });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setPickedLocation(coords);

      if (onLocationPicked) onLocationPicked(coords);

    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} />

      <Button title="Obtener mi ubicación" onPress={getLocationHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
