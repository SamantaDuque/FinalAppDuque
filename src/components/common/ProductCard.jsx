import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../styles/theme';
import { formatPrice } from '../../utils/formatPrice';

const localImages = {
  'agujasCoser.jpg': require('../../../assets/images/agujasCoser.jpg'),
  'agujasCrochet.jpg': require('../../../assets/images/agujasCrochet.jpg'),
  'familia.jpg': require('../../../assets/images/familia.jpg'),
  'frida.jpg': require('../../../assets/images/frida.jpg'),
  'merino.jpg': require('../../../assets/images/merino.jpg'),
  'monoPerfil.jpg': require('../../../assets/images/monoPerfil.jpg'),
  'oso.jpg': require('../../../assets/images/oso.jpg'),
  'pingüino.jpg': require('../../../assets/images/pingüino.jpg'),
  'logo.jpeg': require('../../../assets/images/logo.jpeg'),
};

export default function ProductCard({ producto, onPress }) {
  const productImage = localImages[producto.imagen?.replace('/', '')] || localImages['logo.jpeg'];

  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: COLORS.bg }}>
      <Image source={productImage} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>${formatPrice(producto.precio)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: SIZES.radius,
    padding: 12,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius,
    backgroundColor: '#eee',
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.text,
  },
  precio: {
    marginTop: 6,
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.accent,
  },
});
