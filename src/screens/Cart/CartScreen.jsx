// src/screens/Cart/CartScreen.jsx
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/common/CartItem.jsx';
import Button from '../../components/ui/Button.jsx';
import { removeFromCart, clearCart } from '../../store/cartSlice';

export default function CartScreen() {
  const items = useSelector(s => s.cart.items);
  const total = useSelector(s => s.cart.total);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={it => it.productId}
        renderItem={({ item }) => <CartItem item={item} onRemove={(id)=>dispatch(removeFromCart(id))} />}
        ListEmptyComponent={<Text style={{textAlign:'center', marginTop:20}}>El carrito está vacío</Text>}
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          <Button title="Pagar" onPress={() => { /* aquí llamar createOrder y limpiar carrito */ dispatch(clearCart()); }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:12 },
  footer: { padding:12, borderTopWidth:1, borderColor:'#eee' },
  total: { fontWeight:'700', fontSize:18, marginBottom:8 }
});
