import { initializeApp } from "firebase/app";
// import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC46YLxd5BkM_ynAJ3cxmOXN8n8V6hq0UI",
  authDomain: "next-blog-backend.firebaseapp.com",
  projectId: "next-blog-backend",
  storageBucket: "next-blog-backend.appspot.com",
  messagingSenderId: "18009941809",
  appId: "1:18009941809:web:264507d961ce0d05ebb210",
};

const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleAuthProvider);
};
