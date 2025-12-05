import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import Button from '../../components/ui/Button';

import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { useDispatch } from 'react-redux';
import { setUsuario } from '../../store/authSlice';

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !pass) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const user = cred.user;

      // Guardar datos en Firestore solo si no existe
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        name,
        email,
        createdAt: new Date(),
      });

      // Guardar en Redux
      dispatch(setUsuario({ uid: user.uid, nombre: name, email }));

      // Redirigir a Inicio
      navigation.replace('Inicio');

    } catch (error) {
      console.log('REGISTER ERROR:', error);

      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Registro fallido', 'Este correo ya está registrado.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Registro fallido', 'El email no es válido.');
          break;
        case 'auth/weak-password':
          Alert.alert('Registro fallido', 'La contraseña debe tener al menos 6 caracteres.');
          break;
        default:
          Alert.alert('Registro fallido', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        value={pass}
        onChangeText={setPass}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Registrarse" onPress={handleRegister} />

      <Text
        style={styles.login}
        onPress={() => navigation.navigate('Login')}
      >
        ¿Ya tenés cuenta? Iniciá sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10 },
  login: { marginTop: 12, color: '#2a9d8f', textAlign: 'center' }
});
