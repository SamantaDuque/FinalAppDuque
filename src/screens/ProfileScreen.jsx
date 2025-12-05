// src/screens/ProfileScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function ProfileScreen() {
  // Tomamos el usuario desde Redux
  const usuario = useSelector((state) => state.auth.usuario);

  // Lista de compras (puede llenarse luego con datos reales)
  const compras = usuario?.compras || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.info}>{usuario?.nombre || 'Sin nombre'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{usuario?.email || 'Sin email'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compras realizadas</Text>
        {compras.length === 0 ? (
          <Text style={styles.info}>Aún no realizaste compras.</Text>
        ) : (
          compras.map((item, index) => (
            <Text key={index} style={styles.info}>• {item}</Text>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: '#ddd', // placeholder gris si no hay imagen
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 10,
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginTop: 2,
  },
  section: {
    width: '100%',
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
