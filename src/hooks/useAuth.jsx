// src/hooks/useAuth.js
import { useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/authSlice';

export default function useAuth() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) dispatch(setUser({ uid: user.uid, email: user.email }));
      else dispatch(clearUser());
    });
    return () => unsub();
  }, [dispatch]);
}
