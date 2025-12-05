import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import Button from '../../components/ui/Button';

import { auth, db } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { useDispatch } from 'react-redux';
import { setUsuario } from '../../store/authSlice';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    if (!email || !pass) {
      Alert.alert('Error', 'Completa email y contraseña.');
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const user = cred.user;

      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);

      const nombre = snap.exists() && snap.data().name ? snap.data().name : '';
      dispatch(setUsuario({ uid: user.uid, name: nombre, email: user.email }));

      navigation.replace('Inicio');
    } catch (error) {
      console.log('LOGIN ERROR:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Error', 'Usuario no encontrado.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Error', 'Contraseña incorrecta.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Error', 'Email inválido.');
          break;
        default:
          Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Contraseña"
        value={pass}
        onChangeText={setPass}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />

      <Text style={styles.register} onPress={() => navigation.navigate('Register')}>
        ¿No tenés cuenta? Registrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10 },
  register: { marginTop: 12, color: '#2a9d8f', textAlign: 'center' }
});
