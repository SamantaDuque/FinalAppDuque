// src/components/common/CartItem.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { formatPrice } from '../../utils/formatPrice';

export default function CartItem({ item, onRemove }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.qty}>x{item.qty} • {formatPrice(item.price)}</Text>
      </View>
      <Pressable onPress={() => onRemove(item.productId)} style={styles.btn}>
        <Text style={styles.btnText}>Quitar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 8, backgroundColor: '#fff', marginVertical: 6 },
  img: { width: 60, height: 60, borderRadius: 6, backgroundColor: '#eee' },
  info: { flex: 1, marginLeft: 10 },
  name: { fontWeight: '600' },
  qty: { color: '#666', marginTop: 4 },
  btn: { padding: 8, backgroundColor: '#f44', borderRadius: 6 },
  btnText: { color: '#fff' }
});
