import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getProductById } from '../../api/productsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import Button from '../../components/ui/Button.jsx';
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

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const p = await getProductById(id);
      setProduct(p);
    })();
  }, [id]);

  if (!product)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );

  const productImage = localImages[product.image] || localImages['logo.jpeg'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={productImage} style={styles.image} />

      <Text style={styles.title}>{product.title || product.name}</Text>
      <Text style={styles.price}>${formatPrice(product.price)}</Text>
      <Text style={styles.desc}>{product.description}</Text>

      <Button
        title="Agregar al carrito"
        onPress={() =>
          dispatch(
            addToCart({
              productId: product.id,
              title: product.title || product.name,
              price: Number(product.price) || 0,
              qty: 1,
              image: product.image || null,
            })
          )
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', backgroundColor: '#fff' },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 8,
    color: '#2a9d8f',
  },
  desc: {
    fontSize: 16,
    marginVertical: 8,
    color: '#444',
    textAlign: 'center',
  },
});
