import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleAuthProvider = new GoogleAuthProvider();

  // Create User
  const createUser = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(userCredential.user);
    setLoading(false);
    return userCredential;
  };

  // Google Login User
  const GoogleLoginUser = async () => {
    setLoading(true);
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    setUser(userCredential.user);
    setLoading(false);
    return userCredential;
  };
  // Login User
  const loginUser = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(userCredential.user);
    setLoading(false);
    return userCredential;
  };

  // Update user
  const updateUserProfile = async (user, name, photoURL) => {
    setLoading(true);
    await updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    });
    setUser(user);
    setLoading(false);
  };

  // Log out user
  const logoutUser = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  // User Monitor
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Monitor", currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    GoogleLoginUser,
    updateUserProfile,
    loginUser,
    logoutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
