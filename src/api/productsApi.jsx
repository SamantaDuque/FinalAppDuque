import { db as rtdb } from '../services/firebase';
import { ref as rtdbRef, get as rtdbGet, child as rtdbChild } from 'firebase/database';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const tryRealtime = async () => {
  try {
    const rootRef = rtdbRef(rtdb);
    const snap = await rtdbGet(rtdbChild(rootRef, 'products'));
    if (snap && snap.exists()) {
      const data = snap.val();
      return Object.keys(data).map(k => ({ id: k, ...data[k] }));
    }
    return null;
  } catch (e) {
    console.warn('Realtime DB read failed:', e.message);
    return null;
  }
};

const tryFirestore = async () => {
  try {
    const firestore = getFirestore();
    const col = collection(firestore, 'products');
    const snapshot = await getDocs(col);
    const products = [];
    snapshot.forEach(docSnap => products.push({ id: docSnap.id, ...docSnap.data() }));
    return products;
  } catch (e) {
    console.warn('Firestore read failed:', e.message);
    return null;
  }
};

export async function getProducts() {
  const r = await tryRealtime();
  if (r && r.length) return r;
  const f = await tryFirestore();
  if (f) return f;
  return [];
}

export async function getProductById(productId) {
  // intenta Realtime
  try {
    const rootRef = rtdbRef(rtdb);
    const snap = await rtdbGet(rtdbChild(rootRef, `products/${productId}`));
    if (snap && snap.exists()) return { id: productId, ...snap.val() };
  } catch (e) { /* ignore */ }

  // intenta Firestore
  try {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'products', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  } catch (e) { /* ignore */ }

  return null;
}
