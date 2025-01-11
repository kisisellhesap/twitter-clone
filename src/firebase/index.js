import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC0-Uu4CwqiUn4vwfYDDNIZ8tboX2n3UHs",
  authDomain: "twitter-clone-eb603.firebaseapp.com",
  projectId: "twitter-clone-eb603",
  storageBucket: "twitter-clone-eb603.firebasestorage.app",
  messagingSenderId: "786024905834",
  appId: "1:786024905834:web:90a75c66d0a644f87ede13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
