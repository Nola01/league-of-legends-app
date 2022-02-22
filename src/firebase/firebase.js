
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword
        ,signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, addDoc, collection, onSnapshot, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYe23tP2MhlkAKpyiC-bhqHLZWNxMMdYg",
  authDomain: "league-of-legends-app-9ae9f.firebaseapp.com",
  projectId: "league-of-legends-app-9ae9f",
  storageBucket: "league-of-legends-app-9ae9f.appspot.com",
  messagingSenderId: "198610624125",
  appId: "1:198610624125:web:d34eafa156dd695d129b14"
};

const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

const storage = getStorage();

const register = (email, password) => {
  return createUserWithEmailAndPassword (auth, email, password);
}

const updateName = (userData) => {
  return updateProfile(auth.currentUser, userData);
}

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

const logout = () => {
  return signOut(auth);
}

const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
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

const getFavCharacters = (listener) => {
  return onSnapshot(collection(db, "favorites"), listener); 
}

const addFavCharacter = (character) => {
  return addDoc(collection(db, "favorites"), character);
}

const getImageUrl = async (imageName) => {
  try {
      return await getDownloadURL(ref(storage, 'images/' + imageName));
  } catch (err) {
      return '';
  }
}

const deleteCharacterById = async (id) => {
  const charRef = doc(db, 'characters', id);
  const charDoc = await getDoc(charRef);
  const character = charDoc.data();
  await deleteDoc(charRef);
  const imageRef = ref(storage, 'images/' + character.image);
  await deleteObject(imageRef);
}

const deleteFavCharacterById = async (id) => {
  const charRef = doc(db, 'favorites', id);
  const charDoc = await getDoc(charRef);
  await deleteDoc(charRef);
}

const updateCharacterById = async (id, characterUpdate) => {

  const charRef = doc(db, 'characters', id);
  const charDoc = await getDoc(charRef);
  const character = charDoc.data();

  updateDoc(charRef, 
    {
      name: characterUpdate.name,
      category: characterUpdate.category,
      description: characterUpdate.description,
      image: characterUpdate.image
    }
  )
  .then(function() {
    console.log("Documento actualizado");
  })
  .catch(function(error) {
    console.error("Error al actualizar: ", error);
  });

  const imageRef = ref(storage, 'images/' + character.image);
  await deleteObject(imageRef);
  
}

export {auth, provider, login, register, logout, addCharacter, 
        uploadImage, getCharacters, getImageUrl, deleteCharacterById, 
        addFavCharacter, getFavCharacters, deleteFavCharacterById, updateName,
        resetPassword, updateCharacterById};