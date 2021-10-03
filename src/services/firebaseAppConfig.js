import { initializeApp } from "firebase/app";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_APIKEY,
  authDomain: process.env.REACT_APP_FIRE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_DATABASEURL,
  projectId: process.env.REACT_APP_FIRE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIRE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_MESSAGESENDERID,
  appId: process.env.REACT_APP_FIRE_APPID,
  measurementId: process.env.REACT_APP_FIRE_MEASUREMENTID,
};
// Initialize Firebase

var FIREBASE_APP = initializeApp(firebaseConfig);

export {
    FIREBASE_APP
}
