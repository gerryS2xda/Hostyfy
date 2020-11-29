//Documentazione: https://docs.expo.io/guides/using-firebase/
//Firebase Console -> Sviluppo -> Cloud Firestore

import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

// Optionally import the services that you want to use
//import "firebase/functions";
//import "firebase/storage";
//import "firebase/database";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDfi8rAnBQAvrjKzVPOO1x0Qcv0LVVtphM",
    authDomain: "hostyfy-beckend-firestore.firebaseapp.com",
    databaseURL: "https://hostyfy-beckend-firestore.firebaseio.com",
    projectId: "hostyfy-beckend-firestore",
    storageBucket: "hostyfy-beckend-firestore.appspot.com",
    messagingSenderId: "945169400891",
    appId: "1:945169400891:web:8570ca7446ed7e2f3bc81e"
};



firebase.initializeApp(firebaseConfig);

export { firebase };
