import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeUb4VA0eAcMwqj3fw1FjLd_xqZeSaeng" ,
  authDomain: "shary-4f922.firebaseapp.com",
  projectId: "shary-4f922",
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)
export { db }