import { ref, set } from "firebase/database";
import { db } from "./firebase";

export const testFirebaseWrite = async () => {
  try {
    await set(ref(db, "test/"), {
      message: "Firebase conectado!",
      timestamp: Date.now()
    });
    console.log("🔥 Firebase OK");
  } catch (error) {
    console.log("❌ Error probando Firebase:", error);
  }
};
