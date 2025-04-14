import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBbmZyYA1ybQS0uUSqxgRgKpQuw2JnbAD8",
  authDomain: "worldproblemsolver-56bdc.firebaseapp.com",
  projectId: "worldproblemsolver-56bdc",
  storageBucket: "worldproblemsolver-56bdc.appspot.com",
  messagingSenderId: "289051259567",
  appId: "1:289051259567:web:8953028ccb4de399a0da5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Set persistence to LOCAL (data will persist even after browser restart)
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(); 