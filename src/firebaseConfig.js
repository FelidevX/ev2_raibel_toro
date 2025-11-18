// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdbVHVo6G6CRx5YBFKBwkfxLnTDNGFMRQ",
  authDomain: "reactfb-2e439.firebaseapp.com",
  projectId: "reactfb-2e439",
  storageBucket: "reactfb-2e439.firebasestorage.app",
  messagingSenderId: "470577779747",
  appId: "1:470577779747:web:b1b0e907c31fd449a14d96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);