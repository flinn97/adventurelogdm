import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBvmnwmc5Ckf2Thz7LHPoxMjKlxiEqTyU0",
  authDomain: "legato-1f46f.firebaseapp.com",
  projectId: "legato-1f46f",
  storageBucket: "legato-1f46f.appspot.com",
  messagingSenderId: "161584597472",
  appId: "1:161584597472:web:26c713eee21328a7874385"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);
const auth = getAuth(app);
export {db, storage, auth};
// REACT_APP_SITE_KEY = ""
//  REACT_APP_FIREBASE_KEY = "AIzaSyBvmnwmc5Ckf2Thz7LHPoxMjKlxiEqTyU0"
//  REACT_APP_FIREBASE_AUTH = "legato-1f46f.firebaseapp.com"
//  REACT_APP_FIREBASE_PROJECT = "legato-1f46f"
//  REACT_APP_FIREBASE_STORAGE = "legato-1f46f.appspot.com"
//  REACT_APP_FIREBASE_MESSAGEID = "161584597472"
//  REACT_APP_FIREBASE_APPID = "1:161584597472:web:26c713eee21328a7874385"