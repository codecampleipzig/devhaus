import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCA1raRU4NZsX5-ac3L78S6ItmsVOBoWYI',
  authDomain: 'devhaus-testing.firebaseapp.com',
  databaseURL: 'https://devhaus-testing.firebaseio.com',
  projectId: 'devhaus-testing',
  storageBucket: 'devhaus-testing.appspot.com',
  messagingSenderId: '436592086091',
  appId: '1:436592086091:web:6bf4d398959811795911ce',
};

firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV !== 'production') {
  firebase.firestore().settings({
    host: 'localhost:8088',
    ssl: false,
    experimentalForceLongPolling: true,
  });

  firebase.functions().useFunctionsEmulator('http://localhost:5001');
}

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const functions = firebase.functions();
