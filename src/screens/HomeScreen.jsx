import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos, fetchCategorias } from '../store/productsSlice';
import { COLORS, SIZES, FONTS } from '../styles/theme';
import Header from '../components/ui/Header';
import ProductCard from '../components/common/ProductCard';
import LogoutButton from '../components/ui/LogoutButton';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const productos = useSelector(state => state.products.items);
  const categorias = useSelector(state => state.products.categorias);
  
  const name = useSelector(state => state.auth.usuario?.name);

  useEffect(() => {
    dispatch(fetchProductos());
    dispatch(fetchCategorias());
  }, []);

  const renderHeader = () => (
    <View>
      <Header title="Teje y Desteje" />

      {name && (
        <>
          <Text style={styles.greeting}>Bienvenid@, {name} 👋</Text>
          <LogoutButton />
        </>
      )}

      <Text style={styles.subtitle}>A tu tienda artesanal móvil</Text>

      {/* Categorías */}
      <Text style={styles.sectionTitle}>Categorías</Text>
      <View style={styles.categoryContainer}>
        {categorias?.map(cat => (
          <View key={cat.id} style={styles.categoryItem}>
            <Text style={styles.categoryText}>{cat.nombre}</Text>
          </View>
        ))}
      </View>

      {/* Productos destacados */}
      <Text style={styles.sectionTitle}>Productos Destacados</Text>
    </View>
  );

  return (
    <FlatList
      data={productos}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard producto={item} />}
      columnWrapperStyle={styles.gridRow}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{ paddingBottom: 120 }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  greeting: {
    fontSize: 22,
    color: COLORS.text,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.muted,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginVertical: 15,
    marginLeft: 20,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },

  categoryItem: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: SIZES.radius,
    marginRight: 10,
    marginBottom: 10,
  },

  categoryText: {
    color: '#FFF',
    fontFamily: FONTS.bold,
  },

  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
});
