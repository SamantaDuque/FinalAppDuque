// src/screens/Products/ProductListScreen.jsx
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/common/ProductCard.jsx';
import Loader from '../../components/common/Loader.jsx';

export default function ProductListScreen({ navigation }) {
  const products = useSelector(s => s.products.items);
  const status = useSelector(s => s.products.status);

  if (status === 'loading') return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { id: item.id })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex:1, padding: 12 } });
