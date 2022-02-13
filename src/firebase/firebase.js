
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword
        ,signOut } from "firebase/auth";
import { getFirestore, addDoc, collection, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";


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

const db = getFirestore();

const storage = getStorage();

const register = (email, password) => {
  return createUserWithEmailAndPassword (auth, email, password);
}

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

const logout = () => {
  return signOut(auth);
}

const addCharacter = (character) => {
  return addDoc(collection(db, "characters"), character);
}

const uploadImage = (image) => {
  const storage = getStorage();
  const imageRef = ref(storage, `/images/${image.name}`);
  return uploadBytes(imageRef, image);
}

const getCharacters = (listener) => {
  return onSnapshot(collection(db, "characters"), listener); 
}

const getImageUrl = async (imageName) => {
  try {
      return await getDownloadURL(ref(storage, 'images/' + imageName));
  } catch (err) {
      return '';
  }
}

export {auth, login, register, logout, addCharacter, uploadImage, getCharacters, getImageUrl};