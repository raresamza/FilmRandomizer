import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBju5negFtTGnaAEXQ2HvdSC3N5zM1-8ok",
    authDomain: "filmrandomizer-8e176.firebaseapp.com",
    projectId: "filmrandomizer-8e176",
    storageBucket: "filmrandomizer-8e176.appspot.com",
    messagingSenderId: "991399343652",
    appId: "1:991399343652:web:e2e2b92bbaa788c2cc4ab1",
    measurementId: "G-5JEY6DYPDP"
};

const app=initializeApp(firebaseConfig);
export const db=getFirestore(app);
