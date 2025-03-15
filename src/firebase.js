// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAtoUopIWjzMffmbeVJT01___B0uF5WnM",
  authDomain: "imemory-30df1.firebaseapp.com",
  projectId: "imemory-30df1",
  storageBucket: "imemory-30df1.appspot.com",
  messagingSenderId: "412101391918",
  appId: "1:412101391918:web:38e88c0cf1f1c7dfc111bf",
  measurementId: "G-7GV6N6EDVW",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Firestore (banco de dados)
const db = getFirestore(app);

// Inicialize o Storage (para armazenar mídias)
const storage = getStorage(app);

export { db, storage };