import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { setUsuario, clearUsuario, finishLoading } from '../store/authSlice';

export const authStateListener = (store) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      store.dispatch(setUsuario({
        uid: user.uid,
        email: user.email,
      }));
    } else {
      store.dispatch(clearUsuario());
    }

    store.dispatch(finishLoading());
  });
};
