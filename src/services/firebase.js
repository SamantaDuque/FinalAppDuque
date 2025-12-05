import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgjnek801gZJvQksxyN7w10OZoriPQR4c",
  authDomain: "tejeydesteje-mobile.firebaseapp.com",
  databaseURL: "https://tejeydesteje-mobile-default-rtdb.firebaseio.com",
  projectId: "tejeydesteje-mobile",
  storageBucket: "tejeydesteje-mobile.appspot.com",
  messagingSenderId: "941263480828",
  appId: "1:941263480828:web:3ec5cd1220ae8028453479",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const database = getDatabase(app);
export const db = getFirestore(app);

export default app;
