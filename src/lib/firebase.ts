import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const apiKey: string = (import.meta.env.VITE_APIKEY ?? "") as string;
const authDomain: string = (import.meta.env.VITE_AUTHDOMAIN ?? "") as string;
const projectId: string = (import.meta.env.VITE_PROJECT_ID ?? "") as string;
const storageBucket: string = (import.meta.env.VITE_STORAGE_BUCKET ?? "") as string;
const messagingSenderId: string = (import.meta.env.VITE_MESSAGING_SENDER_ID ?? "") as string;
const appId: string = (import.meta.env.VITE_APP_ID ?? "") as string;
const measurementId: string = (import.meta.env.VITE_MEASUREMENT_ID ?? "") as string;


const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: messagingSenderId,
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth();
const firebaseFirestore = getFirestore();

export default app;
export { firebaseAuth, firebaseFirestore };
