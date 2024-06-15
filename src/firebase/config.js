// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage,ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPKqqJnH2vDPMl_JtJgUSp8tpntVCwHe4",
  authDomain: "blog-website-21191.firebaseapp.com",
  projectId: "blog-website-21191",
  storageBucket: "blog-website-21191.appspot.com",
  messagingSenderId: "490857783225",
  appId: "1:490857783225:web:cffc829c72023b6d782068",
  measurementId: "G-34R4SZ274J"
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const database=getFirestore(app);
export const storage=getStorage(app);


