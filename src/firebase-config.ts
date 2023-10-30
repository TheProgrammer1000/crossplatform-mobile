// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCaVCaYYYBAHrGeN4XfgjtKdCqf1zFsSUw',
  authDomain: 'react-native-49f38.firebaseapp.com',
  projectId: 'react-native-49f38',
  storageBucket: 'react-native-49f38.appspot.com',
  messagingSenderId: '779276447932',
  appId: '1:779276447932:web:5512be197f9e8e7aa160b9'
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
