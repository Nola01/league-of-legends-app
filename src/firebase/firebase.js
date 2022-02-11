
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword
        ,signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYe23tP2MhlkAKpyiC-bhqHLZWNxMMdYg",
  authDomain: "league-of-legends-app-9ae9f.firebaseapp.com",
  projectId: "league-of-legends-app-9ae9f",
  storageBucket: "league-of-legends-app-9ae9f.appspot.com",
  messagingSenderId: "198610624125",
  appId: "1:198610624125:web:d34eafa156dd695d129b14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const register = (email, password) => {
  return createUserWithEmailAndPassword (auth, email, password);
}

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

const logout = () => {
  return signOut(auth);
}

export {auth, login, register, logout};