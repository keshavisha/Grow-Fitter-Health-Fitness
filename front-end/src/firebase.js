import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAASGlnwg9sVYAqPrZS-z3HAB74Gu1Qchs",
  authDomain: "grow-fitter.firebaseapp.com",
  databaseURL: "https://grow-fitter-default-rtdb.firebaseio.com",
  projectId: "grow-fitter",
  storageBucket: "grow-fitter.appspot.com",
  messagingSenderId: "338993183481",
  appId: "1:338993183481:web:ecd49d893e779f302fc028",
  measurementId: "G-MLFLQGJGCR"
};

const app=firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export { auth };