// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQJxB-xp7ZHHaCItxzp82Ei_YqEjVAocQ",
  authDomain: "image-gallery-d382d.firebaseapp.com",
  projectId: "image-gallery-d382d",
  storageBucket: "image-gallery-d382d.appspot.com",
  messagingSenderId: "333731330347",
  appId: "1:333731330347:web:a8b1f8a60663a41b71ad6e"
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_API_KEY,
//   authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket:import.meta.env.VITE_APP_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID
// };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export {db, auth, storage}