import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC46YLxd5BkM_ynAJ3cxmOXN8n8V6hq0UI",
  authDomain: "next-blog-backend.firebaseapp.com",
  projectId: "next-blog-backend",
  storageBucket: "next-blog-backend.appspot.com",
  messagingSenderId: "18009941809",
  appId: "1:18009941809:web:264507d961ce0d05ebb210",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth;
export const firestore = firebase.firestore();
export const storage = firsebase.storage();
