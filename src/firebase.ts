import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD2Oi7eTQ4EVKGzc2fPsdIRgNRXipNgWmk',
  authDomain: 'reactkanban-83b1c.firebaseapp.com',
  projectId: 'reactkanban-83b1c',
  storageBucket: 'reactkanban-83b1c.appspot.com',
  messagingSenderId: '1027263101081',
  appId: '1:1027263101081:web:6e675a996d0742a4e76008',
  measurementId: 'G-VDJHYPZNBL',
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export default auth;
