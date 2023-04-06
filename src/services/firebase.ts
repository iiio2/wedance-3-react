import { initializeApp } from "firebase/app";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_API);

const app = initializeApp(firebaseConfig);
