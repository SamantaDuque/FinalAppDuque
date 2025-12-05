import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearUsuario } from '../../store/authSlice';
import { useNavigation } from '@react-navigation/native';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(clearUsuario());      
    navigation.replace('Login');    
  };

  return <Button title="Cerrar sesión" onPress={handleLogout} />;
}
