import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import categories from '../data/categories.json';
import { COLORS, SIZES, FONTS } from '../styles/theme';

export default function Categories({ onSelectCategory }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => onSelectCategory(item.id)}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: COLORS.accent,
    padding: SIZES.padding,
    marginRight: 10,
    borderRadius: SIZES.radius,
  },
  text: {
    color: '#fff',
    fontFamily: FONTS.bold,
  },
});
