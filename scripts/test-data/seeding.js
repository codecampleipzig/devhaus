const admin = require('firebase-admin');
const axios = require('axios').default;

const exampleProfiles = require('./seeding-profiles.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCA1raRU4NZsX5-ac3L78S6ItmsVOBoWYI',
  authDomain: 'devhaus-testing.firebaseapp.com',
  databaseURL: 'https://devhaus-testing.firebaseio.com',
  projectId: 'devhaus-testing',
  storageBucket: 'devhaus-testing.appspot.com',
  messagingSenderId: '436592086091',
  appId: '1:436592086091:web:6bf4d398959811795911ce',
  credential: admin.credential.cert(process.env.PRIVATE_KEY ? JSON.parse(process.env.PRIVATE_KEY) : require('../../private/devhaus-testing-firebase-adminsdk-ruwvw-c894f6d501.json')),
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();
db.settings({
  host: 'localhost:8088',
  ssl: false,
});

const deleteAll = () => {
    return axios.delete('http://localhost:8080/emulator/v1/projects/firestore-emulator-example/databases/(default)/documents');
};

// Adding exampleProfiles
const addExampleProfiles = () => {
  return Promise.all(exampleProfiles.map((profile) => 
    db.collection('profiles').add(profile),
  ))
};

const runSeeding = async () => {
  try{
    await deleteAll();
    await addExampleProfiles();
  } catch(error) {
    console.error(error)
  }
};

runSeeding();
