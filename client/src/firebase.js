import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realstate-primehomes.firebaseapp.com",
  projectId: "realstate-primehomes",
  storageBucket: "realstate-primehomes.appspot.com",
  messagingSenderId: "613702663526",
  appId: "1:613702663526:web:0ffadd462363162fe31ca7",
  measurementId: "G-JY4BH0GFVF"
};

export const app = initializeApp(firebaseConfig);