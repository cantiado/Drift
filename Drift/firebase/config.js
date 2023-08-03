import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJDGui6yVyY2E4eGF3sPuLqoAixXPtUvk",
  authDomain: "drift-6498e.firebaseapp.com",
  projectId: "drift-6498e",
  storageBucket: "drift-6498e.appspot.com",
  messagingSenderId: "206449071616",
  appId: "1:206449071616:web:2efd820aabc5d408f9eae5",
  measurementId: "G-749QDYLZCE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
