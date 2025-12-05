import React, { useState } from 'react';
import { View, Text } from 'react-native';
import LocationSelector from '../components/common/LocationSelector';

export default function UbicacionScreen() {
  const [location, setLocation] = useState(null);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Seleccioná tu ubicación
      </Text>

      <LocationSelector onLocationPicked={(loc) => setLocation(loc)} />

      {location && (
        <Text style={{ marginTop: 15 }}>
          Lat: {location.latitude} {"\n"}
          Lng: {location.longitude}
        </Text>
      )}
    </View>
  );
}
