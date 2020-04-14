import 'firebase/auth';

import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD9JCLfzQORcwaKlAFuqaOLn46A6Ld-0P8",
  authDomain: "yo-soy-bacan-cb1c2.firebaseapp.com",
  databaseURL: "https://yo-soy-bacan-cb1c2.firebaseio.com",
  projectId: "yo-soy-bacan-cb1c2",
  storageBucket: "yo-soy-bacan-cb1c2.appspot.com",
  messagingSenderId: "320481320513",
  appId: "1:320481320513:web:d2fcdef73fe752a4b730c0",
  measurementId: "G-60PLW5JEKX"
};

export default firebase.initializeApp(firebaseConfig);