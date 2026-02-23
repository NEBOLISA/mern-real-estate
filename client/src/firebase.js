// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-c9f7c.firebaseapp.com',
  projectId: 'mern-estate-c9f7c',
  storageBucket: 'mern-estate-c9f7c.firebasestorage.app',
  messagingSenderId: '1011483938576',
  appId: '1:1011483938576:web:dc94a8edefb163f6045f95'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app