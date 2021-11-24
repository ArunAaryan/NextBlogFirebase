import { initializeApp } from "firebase/app";
// import "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

import firebaseConfig from "../firebaseconfig";

const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
const db = getFirestore();
export { db, doc, getDoc, setDoc, orderBy, limit };
export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleAuthProvider);
};

export function postToJson(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
