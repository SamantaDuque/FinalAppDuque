// src/services/imageService.js
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export async function saveImageLocally(uri) {
  try {
    const filename = uri.split('/').pop();
    const dest = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.copyAsync({ from: uri, to: dest });
    return dest;
  } catch (e) {
    console.error('saveImageLocally', e);
    return null;
  }
}
