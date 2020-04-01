import firebase from 'firebase-admin';

const serviceAccount = require(process.env['GOOGLE_APPLICATION_CREDENTIALS']);

const firebaseInstance = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://yo-soy-bacan-cb1c2.firebaseio.com"
});
export default firebaseInstance;
