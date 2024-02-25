// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCitGtEDTHWfA-8tjYg7uMRZKwCjfgS0VQ",
  authDomain: "todo-list-ea502.firebaseapp.com",
  projectId: "todo-list-ea502",
  storageBucket: "todo-list-ea502.appspot.com",
  messagingSenderId: "333481278588",
  appId: "1:333481278588:web:6b8123889f2a2c824d5df9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);