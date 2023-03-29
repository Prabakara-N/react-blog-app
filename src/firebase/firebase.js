import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrWC5CgWrvxDk-oYOOlNvy94n0O2o2yuo",
  authDomain: "react-blog-app-f4e71.firebaseapp.com",
  projectId: "react-blog-app-f4e71",
  storageBucket: "react-blog-app-f4e71.appspot.com",
  messagingSenderId: "310500570467",
  appId: "1:310500570467:web:8759aedef0a1bdee000f56",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
