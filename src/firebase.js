import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPzoVz0VC5j37JzJOZIFxxrcCD2LovpCg",
  authDomain: "clone-f0b5b.firebaseapp.com",
  projectId: "clone-f0b5b",
  storageBucket: "clone-f0b5b.appspot.com",
  messagingSenderId: "140382565990",
  appId: "1:140382565990:web:7c088fa605d7e15742dfa7",
  measurementId: "G-WF5GPHZSLK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };
