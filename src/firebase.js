import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA13MD5auIxWl4UuBGq-CxRwIDGj-GnF3Q",
  authDomain: "shop-fusion-react.firebaseapp.com",
  projectId: "shop-fusion-react",
  storageBucket: "shop-fusion-react.appspot.com",
  messagingSenderId: "1010136425930",
  appId: "1:1010136425930:web:9f282d9a8c6419fd199b33",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
