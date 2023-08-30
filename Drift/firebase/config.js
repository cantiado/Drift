import { initializeApp } from "firebase/app";
import { getAuth, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Platform } from "react-native";

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
const storage = getStorage(app);

// Set authentication persistence to session for web platforms
// Maintain default (local) otherwise
if (Platform.OS === "web") {
  try {
    auth.setPersistence(browserSessionPersistence);
  } catch (error) {
    console.error(error);
  }
}

export { auth, db, storage };
