// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATpxP7C1bPZs1epaWQ3awhMSPOqEZcKDU",
  authDomain: "",
  projectId: "vue-firebase-ba8d1",
  storageBucket: "",
  messagingSenderId: "",
  appId: "1:65046701575:web:4972eb3d721a4acc852ca2",
};
const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db };
