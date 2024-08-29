import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDEHYJigoh7mofmp1mgbcBMvU55-20H_xk",
  authDomain: "seller-cart.firebaseapp.com",
  projectId: "seller-cart",
  storageBucket: "seller-cart.appspot.com",
  messagingSenderId: "171552487598",
  appId: "1:171552487598:web:a5922f316064fcacebd53f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore=getFirestore(app);
export const auth=getAuth(app)
export const storage = getStorage(app);