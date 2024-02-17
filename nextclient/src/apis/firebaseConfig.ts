
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth";

//Store data in the database.
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAN60IJm3mzlluUEYkFQt05_4G3u5S71M0",
    authDomain: "soulmind-984c9.firebaseapp.com",
    projectId: "soulmind-984c9",
    storageBucket: "soulmind-984c9.appspot.com",
    messagingSenderId: "171901533607",
    appId: "1:171901533607:web:f43dfe5f6a56b66b60ca82",
    measurementId: "G-80D6LHPH23"
  };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firestore = getFirestore(app)

export const auth = getAuth(app)