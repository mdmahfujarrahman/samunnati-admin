import firebase from 'firebase/compat/app';
import { getStorage } from 'firebase/storage';

export const app = firebase.initializeApp({
  locationId: process.env.REACT_APP_locationId,
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messageSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
});

export const storage = getStorage(app);
