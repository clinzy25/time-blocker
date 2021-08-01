import firebase from 'firebase';
require('firebase/firestore');

// Initialize Cloud Firestore through Firebase
const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
} = process.env;
firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
});

const db = firebase.firestore();

export default db;
