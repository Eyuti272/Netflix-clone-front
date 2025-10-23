import firestore from "firebase/compat/app";
import {getAuth } from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD-mbyEb4sE3HCfCI2A_02_XFrbagS_Kbw",
  authDomain: "fir-801f7.firebaseapp.com",
  projectId: "fir-801f7",
  storageBucket: "fir-801f7.firebasestorage.app",
  messagingSenderId: "800201135309",
  appId: "1:800201135309:web:8984c909fbff7c21260584"
};


const app = firestore.initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db = app.firestore()



