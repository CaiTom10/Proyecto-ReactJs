import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6SpCQtYYENJ2qbqEpqVKidFLD12caMCY",
  authDomain: "ar-customs.firebaseapp.com",
  projectId: "ar-customs",
  storageBucket: "ar-customs.firebasestorage.app",
  messagingSenderId: "1096545531373",
  appId: "1:1096545531373:web:8ebca3a3b76ae0a2d2e3e4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
