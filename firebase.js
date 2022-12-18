import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDoFp9nTpo4ymD0-aQePfJVykA7scU3TTs',
  authDomain: 'amzone-clone-d846f.firebaseapp.com',
  projectId: 'amzone-clone-d846f',
  storageBucket: 'amzone-clone-d846f.appspot.com',
  messagingSenderId: '498544139555',
  appId: '1:498544139555:web:1edcb10753f98cb0b98096',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
export default db;
