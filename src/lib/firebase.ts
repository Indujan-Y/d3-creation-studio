// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjTv_czrFQhNyJvdG6BRYYAC6JmnemcvY",
  authDomain: "website-313a1.firebaseapp.com",
  databaseURL: "https://website-313a1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "website-313a1",
  storageBucket: "website-313a1.appspot.com",
  messagingSenderId: "398220519465",
  appId: "1:398220519465:web:8f7a5d18925783f5b89438"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { app, database };