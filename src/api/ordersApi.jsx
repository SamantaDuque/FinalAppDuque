// src/api/ordersApi.js
import { db as rtdb } from '../services/firebase';
import { ref as rtdbRef, push as rtdbPush, set as rtdbSet, get as rtdbGet } from 'firebase/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export async function createOrder(order) {
  // intenta Realtime DB
  try {
    const ordersRef = rtdbRef(rtdb, 'orders');
    const newRef = rtdbPush(ordersRef);
    await rtdbSet(newRef, order);
    return newRef.key;
  } catch (e) {
    console.warn('Realtime order failed, trying Firestore:', e.message);
  }

  // intenta Firestore
  try {
    const firestore = getFirestore();
    const col = collection(firestore, 'orders');
    const docRef = await addDoc(col, order);
    return docRef.id;
  } catch (e) {
    console.error('createOrder failed:', e);
    throw e;
  }
}
