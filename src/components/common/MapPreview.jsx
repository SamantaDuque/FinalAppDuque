import { View, Image, StyleSheet } from "react-native";

const MapPreview = ({ location }) => {
  if (!location) return null;

  const { lat, lng } = location;


  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <View style={styles.container}>
      <Image 
        style={styles.map}
        source={{ uri: mapImageUrl }}
      />
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
