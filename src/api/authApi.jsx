import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// LOGIN
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;

  } catch (error) {
    let msg = "Error al iniciar sesión";

    if (error.code === "auth/invalid-email") msg = "Email inválido";
    if (error.code === "auth/user-not-found") msg = "Usuario no encontrado";
    if (error.code === "auth/wrong-password") msg = "Contraseña incorrecta";

    throw new Error(msg);
  }
};

// REGISTRO
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;

  } catch (error) {
    let msg = "Error al registrarse";

    if (error.code === "auth/email-already-in-use") msg = "El email ya está registrado";
    if (error.code === "auth/weak-password") msg = "La contraseña es demasiado débil";

    throw new Error(msg);
  }
};

// LOGOUT
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw new Error("Error al cerrar sesión");
  }
};
