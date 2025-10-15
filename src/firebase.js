// src/firebase.js (CRA)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// (petit garde-fou pour éviter les écrans blancs silencieux)
for (const [k, v] of Object.entries(firebaseConfig)) {
  if (!v) {
    console.error(`[Firebase] Missing env var: ${k}. Check your .env file.`);
  }
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

