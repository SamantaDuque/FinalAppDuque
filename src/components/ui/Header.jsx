// src/components/ui/Header.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../styles/theme';

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: '#FFF',
    fontFamily: FONTS.bold,
    letterSpacing: 1,
  },
});
