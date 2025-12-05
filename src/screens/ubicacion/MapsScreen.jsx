// src/screens/MapsScreen.jsx
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MapPreview from "../../components/common/MapPreview.jsx";
import * as Location from "expo-location";
import { getMapPreview } from "../../services/maps.js";

const MapsScreen = () => {
  const [location, setLocation] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const getLocationHandler = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permiso de ubicación denegado");
      return;
    }

    const loc = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = loc.coords;

    setLocation({ latitude, longitude });

    const url = getMapPreview(latitude, longitude);
    setPreviewURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi ubicación</Text>

      <MapPreview location={previewURL} />

      <Button title="Obtener ubicación" onPress={getLocationHandler} />
    </View>
  );
};

export default MapsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});
