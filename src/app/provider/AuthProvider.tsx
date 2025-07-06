// app/utils/signInWithGoogle.ts
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../lib/firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User info:", user);
    return {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };
  } catch (error) {
    console.error("Error during sign-in:", error);
    return null;
  }
};
