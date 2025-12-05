// src/components/ui/Button.jsx
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.btn, style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: '#2a9d8f', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  text: { color: '#fff', fontWeight: '700' }
});
