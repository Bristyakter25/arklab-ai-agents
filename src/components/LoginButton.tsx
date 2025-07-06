"use client";

import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useUser } from "@/app/context/UserContext";
import app from "@/app/lib/firebase";


const LoginButton = () => {
  const { setUser } = useUser();

  const handleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <button onClick={handleLogin}>Login with Google</button>;
};

export default LoginButton;
